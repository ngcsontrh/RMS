import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  DatePicker,
  InputNumber,
  Space,
  message,
  Spin,
  Alert,
  Row,
  Col,
  Divider
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as CongBoService from '../services/CongBoService';
import * as NoiDangBaoService from '../services/NoiDangBaoService';
import * as ThanhQuaService from '../services/ThanhQuaService';
import { CongBoData } from '../models/CongBoData';
import { NoiDangBaoData } from '../models/NoiDangBaoData';
import { ThanhQuaData } from '../models/ThanhQuaData';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useAuthStore } from '../stores/authStore';

const { Title } = Typography;
const { Option } = Select;

const CongBoFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [form] = Form.useForm();
  const isEditing = !!id;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      message.error('You must be logged in to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch publication for editing
  const {
    data: congbo,
    isLoading: isLoadingCongBo,
    isError: isErrorCongBo,
    error: congboError
  } = useQuery({
    queryKey: ['congbo', id],
    queryFn: () => CongBoService.getById(id!),
    enabled: isEditing && !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (congbo && isEditing) {
      // Format dates for the form
      const formData = {
        ...congbo,
        ngayGuiDang: congbo.ngayGuiDang ? dayjs(congbo.ngayGuiDang) : undefined,
        ngayCongBo: congbo.ngayCongBo ? dayjs(congbo.ngayCongBo) : undefined,
      };
      form.setFieldsValue(formData);
    }
  }, [congbo, form, isEditing]);

  // Fetch publication locations (NoiDangBao)
  const {
    data: noiDangBaos,
    isLoading: isLoadingNoiDangBao,
  } = useQuery<NoiDangBaoData[]>({
    queryKey: ['noiDangBaos', 'list'],
    queryFn: () => NoiDangBaoService.list(),
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    select: (data: NoiDangBaoData[]) => 
      data.sort((a, b) => (a.ten && b.ten) ? a.ten.localeCompare(b.ten) : 0)
  });

  // Fetch research outcomes (ThanhQua)
  const {
    data: thanhQuas,
    isLoading: isLoadingThanhQua,
  } = useQuery<ThanhQuaData[]>({
    queryKey: ['thanhQuas', 'list'],
    queryFn: () => ThanhQuaService.list(),
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    select: (data: ThanhQuaData[]) => 
      data.sort((a, b) => (a.ten && b.ten) ? a.ten.localeCompare(b.ten) : 0)
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CongBoData) => CongBoService.create(data)
  });

  // Effect to handle createMutation success
  useEffect(() => {
    if (createMutation.isSuccess) {
      message.success('Publication created successfully');
      queryClient.invalidateQueries({ queryKey: ['congbos'] });
      navigate('/congbo');
    }
  }, [createMutation.isSuccess, queryClient, navigate]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Error creating publication:', createMutation.error);
      message.error('Failed to create publication');
    }
  }, [createMutation.isError, createMutation.error]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: CongBoData) => CongBoService.update(data)
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Publication updated successfully');
      queryClient.invalidateQueries({ queryKey: ['congbos'] });
      queryClient.invalidateQueries({ queryKey: ['congbo', id] });
      navigate(`/congbo/${id}`);
    }
  }, [updateMutation.isSuccess, queryClient, navigate, id]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Error updating publication:', updateMutation.error);
      message.error('Failed to update publication');
    }
  }, [updateMutation.isError, updateMutation.error]);

  // Handle form submission
  const handleSubmit = (values: CongBoData) => {
    const formattedValues: CongBoData = {
      ...values,
      id: isEditing ? id : undefined,
    };

    if (isEditing) {
      updateMutation.mutate(formattedValues);
    } else {
      createMutation.mutate(formattedValues);
    }
  };

  // Navigate back to list or detail
  const handleCancel = () => {
    if (isEditing) {
      navigate(`/congbo/${id}`);
    } else {
      navigate('/congbo');
    }
  };

  // Loading state for initial data
  const isLoading = isEditing ? isLoadingCongBo : false;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // If authenticated and loading data for editing
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Loading publication data..." />
      </div>
    );
  }

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleCancel} 
            style={{ marginBottom: 16 }}
          >
            Back
          </Button>
          <Title level={2}>{isEditing ? 'Edit Publication' : 'Create New Publication'}</Title>
        </div>

        {isErrorCongBo && (
          <Alert
            message="Error"
            description={`Failed to load publication data: ${congboError instanceof Error ? congboError.message : 'Unknown error'}`}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            chiSoTacDong: 0,
            diemHoiDong: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Publication Information" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="ten"
                  label="Publication Title"
                  rules={[
                    { required: true, message: 'Please enter publication title' },
                    { max: 200, message: 'Title cannot exceed 200 characters' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="noiDangBaoId"
                      label="Publication Location"
                      rules={[{ required: true, message: 'Please select publication location' }]}
                    >
                      <Select
                        placeholder="Select publication location"
                        loading={isLoadingNoiDangBao}
                        optionFilterProp="children"
                        showSearch
                      >
                        {noiDangBaos?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.ten}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="thanhQuaId"
                      label="Research Outcome"
                    >
                      <Select
                        placeholder="Select research outcome"
                        loading={isLoadingThanhQua}
                        optionFilterProp="children"
                        showSearch
                        allowClear
                      >
                        {thanhQuas?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.ten}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="tenTapChi"
                  label="Journal/Conference Name"
                  rules={[{ required: true, message: 'Please enter journal/conference name' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="nhaXuatBan"
                  label="Publisher"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="diaDiem"
                  label="Location"
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="ngayGuiDang"
                      label="Submission Date"
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ngayCongBo"
                      label="Publication Date"
                      rules={[{ required: true, message: 'Please select publication date' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      name="tap"
                      label="Volume"
                    >
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="ky"
                      label="Issue"
                    >
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="trang"
                      label="Pages"
                    >
                      <Input placeholder="e.g. 123-135" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Author Information" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="tacGiaChinh"
                  label="Main Author"
                  rules={[{ required: true, message: 'Please enter main author' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tacGiaLienHe"
                  label="Corresponding Author"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="dongTacGias"
                  label="Co-Authors"
                >
                  <TextArea rows={3} placeholder="List all co-authors, separated by commas" />
                </Form.Item>

                <Form.Item
                  name="phanChiaSuDongGop"
                  label="Contribution Allocation"
                >
                  <TextArea rows={3} placeholder="Describe how contributions are allocated among authors" />
                </Form.Item>

                <Form.Item
                  name="loaiHoTroChiPhi"
                  label="Publication Cost Support"
                >
                  <Input placeholder="Type of financial support for publication costs" />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Impact and Evaluation" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="chiSoTacDong"
                  label="Impact Factor"
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    step={0.1}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  name="loaiQ"
                  label="Q Index Category"
                >
                  <Select placeholder="Select Q index">
                    <Option value="1">Q1</Option>
                    <Option value="2">Q2</Option>
                    <Option value="3">Q3</Option>
                    <Option value="4">Q4</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="linkMinhChungLoaiQ"
                  label="Q Index Proof Link"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL to Q index proof" />
                </Form.Item>

                <Divider />

                <Form.Item
                  name="tenHoiDong"
                  label="Research Council"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="diemHoiDong"
                  label="Council Score"
                >
                  <InputNumber style={{ width: '100%' }} min={0} max={10} step={0.1} />
                </Form.Item>
              </Card>

              <Card title="Links and Documents">
                <Form.Item
                  name="linkMinhChungTapChi"
                  label="Journal Index Proof Link"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL to journal index proof" />
                </Form.Item>

                <Form.Item
                  name="linkBaiBao"
                  label="Article Link"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL to article" />
                </Form.Item>

                <Form.Item
                  name="fileMinhChungBaiBao"
                  label="Article Document"
                >
                  <Input placeholder="URL or reference to article document" />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={isSubmitting}
              >
                {isEditing ? 'Update Publication' : 'Create Publication'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CongBoFormPage;