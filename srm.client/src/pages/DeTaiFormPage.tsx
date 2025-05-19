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
  const { isAuthenticated, user } = useAuthStore();
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const isEditing = !!id;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      message.error('Bạn phải đăng nhập để truy cập trang này');
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
      message.success('Đề tài nghiên cứu đã được tạo thành công');
      queryClient.invalidateQueries({ queryKey: ['detais'] });
      navigate('/detai');
    }
  }, [createMutation.isSuccess, queryClient, navigate]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Lỗi khi tạo đề tài nghiên cứu:', createMutation.error);
      message.error('Không thể tạo đề tài nghiên cứu');
    }
  }, [createMutation.isError, createMutation.error]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: DeTaiData) => DeTaiService.update(data)
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Đề tài nghiên cứu đã được cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: ['detais'] });
      queryClient.invalidateQueries({ queryKey: ['detai', id] });
      navigate(`/detai/${id}`);
    }
  }, [updateMutation.isSuccess, queryClient, navigate, id]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Lỗi khi cập nhật đề tài nghiên cứu:', updateMutation.error);
      message.error('Không thể cập nhật đề tài nghiên cứu');
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
      nguoiDeXuatId: isAuthenticated ? user?.id : undefined,
      trangThaiPheDuyet: isEditing ? values.trangThaiPheDuyet : 'PENDING',
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
        <Spin size="large" tip="Đang tải dữ liệu đề tài..." />
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
          <Title level={2}>{isEditing ? 'Chỉnh sửa đề tài nghiên cứu' : 'Tạo đề tài nghiên cứu mới'}</Title>
        </div>

        {isErrorDeTai && (
          <Alert
            message="Lỗi"
            description={`Không thể tải dữ liệu đề tài: ${detaiError instanceof Error ? detaiError.message : 'Lỗi không xác định'}`}
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
              <Card title="Thông tin cơ bản" style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="capDeTaiId"
                      label="Cấp đề tài"
                      rules={[{ required: true, message: 'Vui lòng chọn cấp đề tài' }]}
                    >
                      <Select
                        placeholder="Chọn cấp đề tài"
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
                      label="Đơn vị chủ trì"
                      rules={[{ required: true, message: 'Vui lòng chọn đơn vị chủ trì' }]}
                    >
                      <Select
                        placeholder="Chọn đơn vị chủ trì"
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
                  label="Tên đề tài"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên đề tài' },
                    { max: 200, message: 'Tên không được vượt quá 200 ký tự' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="maSo"
                  label="Mã số đề tài"
                  rules={[
                    { required: true, message: 'Vui lòng nhập mã số đề tài' },
                    { max: 50, message: 'Mã số không được vượt quá 50 ký tự' }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="ngayBatDau"
                      label="Ngày bắt đầu"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ngayKetThuc"
                      label="Ngày kết thúc"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                    >
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card title="Nội dung đề tài" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="mucTieu"
                  label="Mục tiêu"
                  rules={[{ required: true, message: 'Vui lòng nhập mục tiêu đề tài' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="noiDung"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung đề tài' }]}
                >
                  <TextArea rows={8} />
                </Form.Item>
              </Card>

              <Card title="Thông tin tài chính">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="tongKinhPhi"
                      label="Tổng kinh phí (VNĐ)"
                      rules={[{ required: true, message: 'Vui lòng nhập tổng kinh phí' }]}
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
                      label="Kinh phí hàng năm (VNĐ)"
                      rules={[{ required: true, message: 'Vui lòng nhập kinh phí hàng năm' }]}
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
              <Card title="Thông tin đội ngũ">
                <Form.Item
                  name="chuNhiem"
                  label="Chủ nhiệm đề tài"
                  rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm đề tài' }]}
                >
                  <Input />
                </Form.Item>

                <Divider>Thành viên tham gia</Divider>

                <div style={{ marginBottom: 16 }}>
                  {teamMembers.map((member, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
                      <Input
                        value={member}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                        placeholder={`Thành viên ${index + 1}`}
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
                    Thêm thành viên
                  </Button>
                </div>

                <Form.Item
                  name="phanChiaSuDongGop"
                  label="Phân chia đóng góp"
                >
                  <TextArea rows={4} placeholder="Mô tả sự phân chia đóng góp giữa các thành viên" />
                </Form.Item>
              </Card>

              <Card title="Tài liệu" style={{ marginTop: 24 }}>
                <Form.Item
                  name="hoSoNghiemThu"
                  label="Hồ sơ nghiệm thu"
                >
                  <Input placeholder="URL hoặc tham chiếu đến hồ sơ nghiệm thu" />
                </Form.Item>

                <Form.Item
                  name="hoSoSanPham"
                  label="Hồ sơ sản phẩm"
                >
                  <Input placeholder="URL hoặc tham chiếu đến hồ sơ sản phẩm" />
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
                {isEditing ? 'Cập nhật đề tài' : 'Tạo đề tài'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default DeTaiFormPage;