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
import * as HoatDongService from '../services/HoatDongService';
import * as LoaiHoatDongService from '../services/LoaiHoatDongService';
import { HoatDongData } from '../models/HoatDongData';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useAuthStore } from '../stores/authStore';
import { LoaiHoatDongData } from '../models/LoaiHoatDongData';

const { Title } = Typography;
const { Option } = Select;

const HoatDongFormPage: React.FC = () => {
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
      message.error('Bạn phải đăng nhập để truy cập trang này');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch activity for editing
  const {
    data: hoatdong,
    isLoading: isLoadingHoatDong,
    isError: isErrorHoatDong,
    error: hoatdongError
  } = useQuery({
    queryKey: ['hoatdong', id],
    queryFn: () => HoatDongService.getById(id!),
    enabled: isEditing && !!id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Set form values when data is loaded
  useEffect(() => {
    if (hoatdong && isEditing) {
      // Format dates for the form
      const formData = {
        ...hoatdong,
        ngayBatDau: hoatdong.ngayBatDau ? dayjs(hoatdong.ngayBatDau) : undefined,
        ngayKetThuc: hoatdong.ngayKetThuc ? dayjs(hoatdong.ngayKetThuc) : undefined,
      };
      form.setFieldsValue(formData);
      
      // Parse team members from string (if available)
      if (hoatdong.thanhVienThamGias) {
        // Split by commas or semicolons
        const members = hoatdong.thanhVienThamGias.split(/[,;]/).map(m => m.trim()).filter(m => m);
        setTeamMembers(members.length > 0 ? members : []);
      } else {
        setTeamMembers([]);
      }
    }
  }, [hoatdong, form, isEditing]);

  // Fetch activity types (loaiHoatDong) using list API
  const {
    data: loaiHoatDongs,
    isLoading: isLoadingLoaiHoatDong,
  } = useQuery<LoaiHoatDongData[]>({
    queryKey: ['loaiHoatDongs', 'list'],
    queryFn: () => LoaiHoatDongService.list(),
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    select: (data: LoaiHoatDongData[]) => 
      data.sort((a, b) => (a.ten && b.ten) ? a.ten.localeCompare(b.ten) : 0)
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: HoatDongData) => HoatDongService.create(data)
  });

  // Effect to handle createMutation success
  useEffect(() => {
    if (createMutation.isSuccess) {
      message.success('Hoạt động được tạo thành công');
      queryClient.invalidateQueries({ queryKey: ['hoatdongs'] });
      navigate('/hoatdong');
    }
  }, [createMutation.isSuccess, queryClient, navigate]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Lỗi khi tạo hoạt động:', createMutation.error);
      message.error('Không thể tạo hoạt động');
    }
  }, [createMutation.isError, createMutation.error]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: HoatDongData) => HoatDongService.update(data)
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Hoạt động được cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: ['hoatdongs'] });
      queryClient.invalidateQueries({ queryKey: ['hoatdong', id] });
      navigate(`/hoatdong/${id}`);
    }
  }, [updateMutation.isSuccess, queryClient, navigate, id]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Lỗi khi cập nhật hoạt động:', updateMutation.error);
      message.error('Không thể cập nhật hoạt động');
    }
  }, [updateMutation.isError, updateMutation.error]);

  // Handle form submission
  const handleSubmit = (values: HoatDongData) => {
    // Join team members into a string
    const formattedTeamMembers = teamMembers.filter(member => member.trim() !== '').join('; ');
    
    const formattedValues: HoatDongData = {
      ...values,
      id: isEditing ? id : undefined,
      thanhVienThamGias: formattedTeamMembers,
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
      navigate(`/hoatdong/${id}`);
    } else {
      navigate('/hoatdong');
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
  const isLoading = isEditing ? isLoadingHoatDong : false;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // If authenticated and loading data for editing
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải dữ liệu hoạt động..." />
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
          <Title level={2}>{isEditing ? 'Chỉnh sửa hoạt động' : 'Tạo hoạt động mới'}</Title>
        </div>

        {isErrorHoatDong && (
          <Alert
            message="Lỗi"
            description={`Không thể tải dữ liệu hoạt động: ${hoatdongError instanceof Error ? hoatdongError.message : 'Lỗi không xác định'}`}
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
            kinhPhi: 0,
            soTrang: 0,
            soTiet: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Thông tin cơ bản" style={{ marginBottom: 24 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="loaiHoatDongId"
                      label="Loại hoạt động"
                      rules={[{ required: true, message: 'Vui lòng chọn loại hoạt động' }]}
                    >
                      <Select
                        placeholder="Chọn loại hoạt động"
                        loading={isLoadingLoaiHoatDong}
                        optionFilterProp="children"
                        showSearch
                      >
                        {loaiHoatDongs?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.ten}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="ten"
                      label="Tên hoạt động"
                      rules={[
                        { required: true, message: 'Vui lòng nhập tên hoạt động' },
                        { max: 200, message: 'Tên không thể vượt quá 200 ký tự' }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="diaChi"
                  label="Địa điểm"
                  rules={[
                    { max: 300, message: 'Địa điểm không thể vượt quá 300 ký tự' }
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

              <Card title="Nội dung hoạt động" style={{ marginBottom: 24 }}>
                <Form.Item
                  name="noiDung"
                  label="Nội dung"
                  rules={[{ required: true, message: 'Vui lòng nhập nội dung hoạt động' }]}
                >
                  <TextArea rows={6} />
                </Form.Item>

                <Form.Item
                  name="ghiChu"
                  label="Ghi chú"
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Card>

              <Card title="Thông tin tài chính và chi tiết">
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      name="kinhPhi"
                      label="Kinh phí (VND)"
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="soTrang"
                      label="Số trang"
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="soTiet"
                      label="Số tiết"
                    >
                      <InputNumber 
                        style={{ width: '100%' }} 
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="Thông tin nhóm tham gia">
                <Form.Item
                  name="chuNhiem"
                  label="Chủ nhiệm"
                  rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm' }]}
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
                  <TextArea rows={4} placeholder="Mô tả phân chia đóng góp giữa các thành viên" />
                </Form.Item>
              </Card>

              <Card title="Tài liệu và đường dẫn" style={{ marginTop: 24 }}>
                <Form.Item
                  name="fileDinhKem"
                  label="File đính kèm"
                >
                  <Input placeholder="URL hoặc đường dẫn đến file đính kèm" />
                </Form.Item>

                <Form.Item
                  name="duongDan"
                  label="Đường dẫn liên quan"
                >
                  <Input placeholder="URL liên quan đến hoạt động" />
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={isSubmitting}
              >
                {isEditing ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default HoatDongFormPage;