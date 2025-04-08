import React, { useState, useEffect } from 'react';
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
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as DeTaiService from '../services/DeTaiService';
import * as CapDeTaiService from '../services/CapDeTaiService';
import * as DonViChuTriService from '../services/DonViChuTriService';
import { DeTaiData } from '../models/DeTaiData';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useAuthStore } from '../stores/authStore';
import { CapDeTaiData } from '../models/CapDeTaiData';
import { DonViChuTriData } from '../models/DonViChuTriData';

const { Title } = Typography;
const { Option } = Select;

const DeTaiFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const isEditing = !!id;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      message.error('You must be logged in to access this page');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch research project for editing
  const {
    data: detai,
    isLoading: isLoadingDeTai,
    isError: isErrorDeTai,
    error: detaiError
  } = useQuery({
    queryKey: ['detai', id],
    queryFn: () => DeTaiService.getById(id!),
    enabled: isEditing && !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (detai && isEditing) {
      // Format dates for the form
      const formData = {
        ...detai,
        ngayBatDau: detai.ngayBatDau ? dayjs(detai.ngayBatDau) : undefined,
        ngayKetThuc: detai.ngayKetThuc ? dayjs(detai.ngayKetThuc) : undefined,
      };
      form.setFieldsValue(formData);
      
      // Set team members - ensure it's always an array
      if (detai.canBoThamGias && Array.isArray(detai.canBoThamGias) && detai.canBoThamGias.length > 0) {
        setTeamMembers(detai.canBoThamGias);
      } else {
        setTeamMembers([]);
      }
    }
  }, [detai, form, isEditing]);

  // Fetch research levels (capDeTai) using list API
  const {
    data: capDeTais,
    isLoading: isLoadingCapDeTai,
  } = useQuery<CapDeTaiData[]>({
    queryKey: ['capDeTais', 'list'],
    queryFn: () => CapDeTaiService.list(),
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes (was cacheTime)
    select: (data: CapDeTaiData[]) => 
      data.sort((a, b) => (a.ten && b.ten) ? a.ten.localeCompare(b.ten) : 0)
  });

  // Fetch host organizations (donViChuTri) using list API
  const {
    data: donViChuTris,
    isLoading: isLoadingDonViChuTri,
  } = useQuery<DonViChuTriData[]>({
    queryKey: ['donViChuTris', 'list'],
    queryFn: () => DonViChuTriService.list(),
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes (was cacheTime)
    select: (data: DonViChuTriData[]) => 
      data.sort((a, b) => (a.ten && b.ten) ? a.ten.localeCompare(b.ten) : 0)
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: DeTaiData) => DeTaiService.create(data)
  });

  // Effect to handle createMutation success
  useEffect(() => {
    if (createMutation.isSuccess) {
      message.success('Research project created successfully');
      queryClient.invalidateQueries({ queryKey: ['detais'] });
      navigate('/detai');
    }
  }, [createMutation.isSuccess, queryClient, navigate]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Error creating research project:', createMutation.error);
      message.error('Failed to create research project');
    }
  }, [createMutation.isError, createMutation.error]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: DeTaiData) => DeTaiService.update(data)
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Research project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['detais'] });
      queryClient.invalidateQueries({ queryKey: ['detai', id] });
      navigate(`/detai/${id}`);
    }
  }, [updateMutation.isSuccess, queryClient, navigate, id]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Error updating research project:', updateMutation.error);
      message.error('Failed to update research project');
    }
  }, [updateMutation.isError, updateMutation.error]);

  // Handle form submission
  const handleSubmit = (values: DeTaiData) => {
    // Validate team members - filter out empty entries
    const validTeamMembers = teamMembers.filter(member => member.trim() !== '');
    
    const formattedValues: DeTaiData = {
      ...values,
      id: isEditing ? id : undefined,
      canBoThamGias: validTeamMembers,
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
      navigate(`/detai/${id}`);
    } else {
      navigate('/detai');
    }
  };

  // Handle adding team members
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  // Handle removing team members
  const removeTeamMember = (index: number) => {
    const updatedMembers = [...teamMembers];
    updatedMembers.splice(index, 1);
    setTeamMembers(updatedMembers);
  };

  // Handle changing team member names
  const handleTeamMemberChange = (index: number, value: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  // Loading state for initial data
  const isLoading = isEditing ? isLoadingDeTai : false;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // If authenticated and loading data for editing
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Loading project data..." />
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
          <Title level={2}>{isEditing ? 'Edit Research Project' : 'Create New Research Project'}</Title>
        </div>

        {isErrorDeTai && (
          <Alert
            message="Error"
            description={`Failed to load research project data: ${detaiError instanceof Error ? detaiError.message : 'Unknown error'}`}
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
            tongKinhPhi: 0,
            kinhPhiHangNam: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Basic Information" style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="capDeTaiId"
                      label="Research Level"
                      rules={[{ required: true, message: 'Please select research level' }]}
                    >
                      <Select
                        placeholder="Select research level"
                        loading={isLoadingCapDeTai}
                        optionFilterProp="children"
                        showSearch
                      >
                        {capDeTais?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.ten}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="donViChuTriId"
                      label="Host Organization"
                      rules={[{ required: true, message: 'Please select host organization' }]}
                    >
                      <Select
                        placeholder="Select host organization"
                        loading={isLoadingDonViChuTri}
                        optionFilterProp="children"
                        showSearch
                      >
                        {donViChuTris?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.ten}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="ten"
                  label="Project Name"
                  rules={[
                    { required: true, message: 'Please enter project name' },
                    { max: 200, message: 'Name cannot exceed 200 characters' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="maSo"
                  label="Project Code"
                  rules={[
                    { required: true, message: 'Please enter project code' },
                    { max: 50, message: 'Code cannot exceed 50 characters' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="ngayBatDau"
                      label="Start Date"
                      rules={[{ required: true, message: 'Please select start date' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ngayKetThuc"
                      label="End Date"
                      rules={[{ required: true, message: 'Please select end date' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Project Content" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="mucTieu"
                  label="Objectives"
                  rules={[{ required: true, message: 'Please enter project objectives' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="noiDung"
                  label="Content"
                  rules={[{ required: true, message: 'Please enter project content' }]}
                >
                  <TextArea rows={8} />
                </Form.Item>
              </Card>

              <Card title="Financial Information">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="tongKinhPhi"
                      label="Total Budget (VND)"
                      rules={[{ required: true, message: 'Please enter total budget' }]}
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="kinhPhiHangNam"
                      label="Annual Budget (VND)"
                      rules={[{ required: true, message: 'Please enter annual budget' }]}
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Team Information">
                <Form.Item
                  name="chuNhiem"
                  label="Principal Investigator"
                  rules={[{ required: true, message: 'Please enter principal investigator' }]}
                >
                  <Input />
                </Form.Item>

                <Divider>Team Members</Divider>

                <div style={{ marginBottom: 16 }}>
                  {teamMembers.map((member, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
                      <Input
                        value={member}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                        placeholder={`Team member ${index + 1}`}
                        style={{ marginRight: 8 }}
                      />
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => removeTeamMember(index)}
                        type="text"
                        danger
                      />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={addTeamMember}
                    icon={<PlusOutlined />}
                    style={{ width: '100%' }}
                  >
                    Add Team Member
                  </Button>
                </div>

                <Form.Item
                  name="phanChiaSuDongGop"
                  label="Contribution Allocation"
                >
                  <TextArea rows={4} placeholder="Describe how contributions are allocated among team members" />
                </Form.Item>
              </Card>

              <Card title="Documents" style={{ marginTop: 24 }}>
                <Form.Item
                  name="hoSoNghiemThu"
                  label="Acceptance Documents"
                >
                  <Input placeholder="URL or reference to acceptance documents" />
                </Form.Item>

                <Form.Item
                  name="hoSoSanPham"
                  label="Product Documents"
                >
                  <Input placeholder="URL or reference to product documents" />
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
                {isEditing ? 'Update Project' : 'Create Project'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default DeTaiFormPage;