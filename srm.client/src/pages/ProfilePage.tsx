import React, { useEffect, useState } from 'react';
import { Card, Avatar, Descriptions, Button, Tabs, Form, Input, Modal, Spin, message, Select, DatePicker } from 'antd';
import { UserOutlined, EditOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import type { TabsProps } from 'antd';
import * as UserService from '../services/UserService';
import * as RoleService from '../services/RoleService';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import api from '../utils/api';
import { isAuthenticated } from '../services/AuthService';

const { Option } = Select;

const ProfilePage: React.FC = () => {
  const { user, fetchUser } = useAuthStore();
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Fetch detailed user data from the API
  const { data: userData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => UserService.getById(user?.id || ''),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Fetch roles for the user
  const { data: rolesData } = useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleService.list(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Update user profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: UserService.update,
    onSuccess: () => {
      message.success('Hồ sơ cá nhân đã được cập nhật thành công');
      fetchUser(); // Refresh user data in the auth store
      refetch(); // Refresh user data in this component
      setEditProfileVisible(false);
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật hồ sơ:', error);
      message.error('Không thể cập nhật hồ sơ cá nhân');
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => {
      return api.post('/Auth/change-password', data);
    },
    onSuccess: () => {
      message.success('Mật khẩu đã được thay đổi thành công');
      setChangePasswordVisible(false);
      passwordForm.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi đổi mật khẩu:', error);
      message.error('Không thể thay đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại.');
    }
  });

  // Set initial form values when user data is loaded
  useEffect(() => {
    if (userData) {
      profileForm.setFieldsValue({
        hoTen: userData.hoTen,
        email: userData.email,
        soDienThoai: userData.soDienThoai,
        maVienChuc: userData.maVienChuc,
        gioiTinh: userData.gioiTinh,
        ngaySinh: userData.ngaySinh ? dayjs(userData.ngaySinh) : undefined,
        danToc: userData.danToc,
        chucDanh: userData.chucDanh,
        chuyenNganh: userData.chuyenNganh,
        hocVi: userData.hocVi,
        truongDH: userData.truongDH,
      });
    }
  }, [userData, profileForm]);

  // Handle profile form submission
  const handleProfileSubmit = async () => {
    try {
      const values = await profileForm.validateFields();
      updateProfileMutation.mutate({
        ...userData,
        ...values,
        id: user?.id,
      });
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async () => {
    try {
      const values = await passwordForm.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        message.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
        return;
      }
      
      changePasswordMutation.mutate({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  // Create tab items configuration for Tabs component
  const tabItems: TabsProps['items'] = [
    {
      key: 'details',
      label: 'Thông tin cá nhân',
      children: (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ và tên">
            {userData?.hoTen || user?.username || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">
            {user?.username || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userData?.email || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {userData?.soDienThoai || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Mã viên chức">
            {userData?.maVienChuc || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {userData?.gioiTinh || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Đơn vị">
            {userData?.tenDonVi || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {userData?.ngaySinh ? dayjs(userData.ngaySinh).format('DD/MM/YYYY') : 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc">
            {userData?.danToc || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Chức danh">
            {userData?.chucDanh || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Chuyên ngành">
            {userData?.chuyenNganh || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Học vị">
            {userData?.hocVi || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Trường đại học">
            {userData?.truongDH || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {user?.roles?.join(', ') || 'Chưa cung cấp'}
          </Descriptions.Item>
        </Descriptions>
      )
    },
    {
      key: 'security',
      label: 'Bảo mật',
      children: (
        <div style={{ padding: '20px 0' }}>
          <h3>Quản lý mật khẩu</h3>
          <p>Bạn có thể thay đổi mật khẩu để bảo vệ tài khoản.</p>
          <Button 
            type="primary" 
            icon={<KeyOutlined />}
            style={{ marginTop: 16 }}
            onClick={() => setChangePasswordVisible(true)}
          >
            Đổi mật khẩu
          </Button>
        </div>
      )
    }
  ];

  // Loading state for the profile page
  if (isLoading) {
    return (
      <div className="page-container">
        <Spin size="large" tip="Đang tải thông tin hồ sơ..." />
      </div>
    );
  }

  // Error state for the profile page
  if (isError) {
    return (
      <div className="page-container">
        <h1>Hồ sơ cá nhân</h1>
        <Card>
          <p>Có lỗi xảy ra khi tải thông tin hồ sơ: {error instanceof Error ? error.message : 'Lỗi không xác định'}</p>
          <Button type="primary" onClick={() => refetch()}>Thử lại</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Hồ sơ cá nhân</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Card 
          style={{ 
            width: 300, 
            marginBottom: 20,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Avatar 
              size={100} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#0078D4', marginBottom: 20 }}
            />
            <h2>{userData?.hoTen || user?.username || 'Người dùng'}</h2>
            <p>Vai trò: {user?.roles?.join(', ') || 'Chưa cung cấp'}</p>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              style={{ marginTop: 16 }}
              onClick={() => setEditProfileVisible(true)}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </div>
        </Card>
      
        <Card 
          style={{ 
            flex: 1, 
            minWidth: 300,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Tabs defaultActiveKey="details" items={tabItems} />
        </Card>
      </div>
      
      {/* Edit Profile Modal */}
      <Modal
        title="Chỉnh sửa hồ sơ"
        open={editProfileVisible}
        onCancel={() => setEditProfileVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditProfileVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            icon={<SaveOutlined />} 
            loading={updateProfileMutation.isPending}
            onClick={handleProfileSubmit}
          >
            Lưu thay đổi
          </Button>
        ]}
        width={700}
      >
        <Form
          form={profileForm}
          layout="vertical"
          initialValues={userData}
        >
          <Form.Item
            name="hoTen"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input />
          </Form.Item>
          {isAuthenticated() && user?.roles?.includes("Admin") && (
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select allowClear placeholder="Chọn vai trò">
                {rolesData?.map((role) => (
                  <Option key={role.id} value={role.name}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Email không hợp lệ' },
              { required: true, message: 'Vui lòng nhập email' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soDienThoai"
            label="Số điện thoại"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="maVienChuc"
            label="Mã viên chức"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="gioiTinh"
            label="Giới tính"
          >
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="ngaySinh"
            label="Ngày sinh"
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="danToc"
            label="Dân tộc"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="chucDanh"
            label="Chức danh"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="chuyenNganh"
            label="Chuyên ngành"
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="hocVi"
            label="Học vị"
          >
            <Select>
              <Option value="Cử nhân">Cử nhân</Option>
              <Option value="Thạc sĩ">Thạc sĩ</Option>
              <Option value="Tiến sĩ">Tiến sĩ</Option>
              <Option value="Phó giáo sư">Phó giáo sư</Option>
              <Option value="Giáo sư">Giáo sư</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="truongDH"
            label="Trường đại học"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Change Password Modal */}
      <Modal
        title="Đổi mật khẩu"
        open={changePasswordVisible}
        onCancel={() => setChangePasswordVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setChangePasswordVisible(false)}>
            Hủy
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            icon={<KeyOutlined />} 
            loading={changePasswordMutation.isPending}
            onClick={handlePasswordSubmit}
          >
            Đổi mật khẩu
          </Button>
        ]}
      >
        <Form
          form={passwordForm}
          layout="vertical"
        >
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              { min: 6, message: 'Mật khẩu cần ít nhất 6 ký tự' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;