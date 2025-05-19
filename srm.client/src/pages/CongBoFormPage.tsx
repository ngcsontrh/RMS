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
      message.error('Bạn phải đăng nhập để truy cập trang này');
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
      message.success('Tạo công bố thành công');
      queryClient.invalidateQueries({ queryKey: ['congbos'] });
      navigate('/congbo');
    }
  }, [createMutation.isSuccess, queryClient, navigate]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Error creating publication:', createMutation.error);
      message.error('Tạo công bố thất bại');
    }
  }, [createMutation.isError, createMutation.error]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: CongBoData) => CongBoService.update(data)
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Cập nhật công bố thành công');
      queryClient.invalidateQueries({ queryKey: ['congbos'] });
      queryClient.invalidateQueries({ queryKey: ['congbo', id] });
      navigate(`/congbo/${id}`);
    }
  }, [updateMutation.isSuccess, queryClient, navigate, id]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Error updating publication:', updateMutation.error);
      message.error('Cập nhật công bố thất bại');
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
        <Spin size="large" tip="Đang tải dữ liệu công bố..." />
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
            Quay lại
          </Button>
          <Title level={2}>{isEditing ? 'Chỉnh sửa công bố' : 'Tạo công bố mới'}</Title>
        </div>

        {isErrorCongBo && (
          <Alert
            message="Lỗi"
            description={`Không thể tải dữ liệu công bố: ${congboError instanceof Error ? congboError.message : 'Lỗi không xác định'}`}
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
              <Card title="Thông tin công bố" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="ten"
                  label="Tiêu đề công bố"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tiêu đề công bố' },
                    { max: 200, message: 'Tiêu đề không vượt quá 200 ký tự' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="noiDangBaoId"
                      label="Nơi đăng báo"
                      rules={[{ required: true, message: 'Vui lòng chọn nơi đăng báo' }]}
                    >
                      <Select
                        placeholder="Chọn nơi đăng báo"
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
                      label="Thành quả nghiên cứu"
                    >
                      <Select
                        placeholder="Chọn thành quả nghiên cứu"
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
                  label="Tên tạp chí/hội nghị"
                  rules={[{ required: true, message: 'Vui lòng nhập tên tạp chí/hội nghị' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="nhaXuatBan"
                  label="Nhà xuất bản"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="diaDiem"
                  label="Địa điểm"
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="ngayGuiDang"
                      label="Ngày gửi đăng"
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ngayCongBo"
                      label="Ngày công bố"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày công bố' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      name="tap"
                      label="Tập"
                    >
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="ky"
                      label="Kỳ"
                    >
                      <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="trang"
                      label="Trang"
                    >
                      <Input placeholder="VD: 123-135" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Thông tin tác giả" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="tacGiaChinh"
                  label="Tác giả chính"
                  rules={[{ required: true, message: 'Vui lòng nhập tác giả chính' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="tacGiaLienHe"
                  label="Tác giả liên hệ"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="dongTacGias"
                  label="Đồng tác giả"
                >
                  <TextArea rows={3} placeholder="Liệt kê các đồng tác giả, cách nhau bởi dấu phẩy" />
                </Form.Item>

                <Form.Item
                  name="phanChiaSuDongGop"
                  label="Phân chia đóng góp"
                >
                  <TextArea rows={3} placeholder="Mô tả phân chia đóng góp giữa các tác giả" />
                </Form.Item>

                <Form.Item
                  name="loaiHoTroChiPhi"
                  label="Hỗ trợ chi phí công bố"
                >
                  <Input placeholder="Loại hỗ trợ chi phí công bố" />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Tác động & Đánh giá" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="chiSoTacDong"
                  label="Chỉ số tác động"
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    step={0.1}
                    min={0}
                  />
                </Form.Item>

                <Form.Item
                  name="loaiQ"
                  label="Phân loại Q"
                >
                  <Select placeholder="Chọn phân loại Q">
                    <Option value="1">Q1</Option>
                    <Option value="2">Q2</Option>
                    <Option value="3">Q3</Option>
                    <Option value="4">Q4</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="linkMinhChungLoaiQ"
                  label="Link minh chứng phân loại Q"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL minh chứng phân loại Q" />
                </Form.Item>

                <Divider />

                <Form.Item
                  name="tenHoiDong"
                  label="Tên hội đồng"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="diemHoiDong"
                  label="Điểm hội đồng"
                >
                  <InputNumber style={{ width: '100%' }} min={0} max={10} step={0.1} />
                </Form.Item>
              </Card>

              <Card title="Liên kết & Tài liệu">
                <Form.Item
                  name="linkMinhChungTapChi"
                  label="Link minh chứng tạp chí"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL minh chứng tạp chí" />
                </Form.Item>

                <Form.Item
                  name="linkBaiBao"
                  label="Link bài báo"
                >
                  <Input addonBefore={<LinkOutlined />} placeholder="URL bài báo" />
                </Form.Item>

                <Form.Item
                  name="fileMinhChungBaiBao"
                  label="Tài liệu bài báo"
                >
                  <Input placeholder="URL hoặc tham chiếu tài liệu bài báo" />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={isSubmitting}
              >
                {isEditing ? 'Cập nhật công bố' : 'Tạo công bố'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CongBoFormPage;