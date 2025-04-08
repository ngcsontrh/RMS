import React from 'react';
import { Card, Avatar, Descriptions, Button, Tabs } from 'antd';
import { UserOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import { getRelativeTime } from '../utils/dateTime';
import type { TabsProps } from 'antd';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  // Create tab items configuration for Tabs component
  const tabItems: TabsProps['items'] = [
    {
      key: 'details',
      label: 'Thông tin cá nhân',
      children: (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Họ và tên">
            {user?.username || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Tên đăng nhập">
            {user?.username || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {user?.roles?.join(', ') || 'Chưa cung cấp'}
          </Descriptions.Item>
          <Descriptions.Item label="Thành viên từ">
            {user?.id ? getRelativeTime(new Date(parseInt(user.id.substring(0, 8), 16) * 1000)) : 'Không có thông tin'}
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
          >
            Đổi mật khẩu
          </Button>
        </div>
      )
    }
  ];

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
            <h2>{user?.username || 'Người dùng'}</h2>
            <p>Vai trò: {user?.roles?.join(', ') || 'Chưa cung cấp'}</p>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              style={{ marginTop: 16 }}
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
    </div>
  );
};

export default ProfilePage;