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
      label: 'Personal Details',
      children: (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Full Name">
            {user?.username || 'Not provided'}
          </Descriptions.Item>
          <Descriptions.Item label="Username">
            {user?.username || 'Not provided'}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            {user?.roles?.join(', ') || 'Not provided'}
          </Descriptions.Item>
          <Descriptions.Item label="Member Since">
            {user?.id ? getRelativeTime(new Date(parseInt(user.id.substring(0, 8), 16) * 1000)) : 'Not available'}
          </Descriptions.Item>
        </Descriptions>
      )
    },
    {
      key: 'security',
      label: 'Security',
      children: (
        <div style={{ padding: '20px 0' }}>
          <h3>Password Management</h3>
          <p>You can change your password to maintain account security.</p>
          <Button 
            type="primary" 
            icon={<KeyOutlined />}
            style={{ marginTop: 16 }}
          >
            Change Password
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="page-container">
      <h1>Profile</h1>
      
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
            <h2>{user?.username || 'User'}</h2>
            <p>Role: {user?.roles?.join(', ') || 'Not provided'}</p>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              style={{ marginTop: 16 }}
            >
              Edit Profile
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