import React, { useEffect } from 'react';
import { Button, Form, Input, Card, message, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { LoginData } from '../models/LoginData';

const LoginPage: React.FC = () => {
  const { login, error, isLoading, clearError } = useAuthStore();
  const navigate = useNavigate();
  
  // Clear any auth errors when the component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  const onFinish = async (values: LoginData) => {
    try {
      const success = await login(values);
      if (success) {
        message.success('Login successful!');
        
        // Get current user from store
        const { user } = useAuthStore.getState();
        
        // Check if user has admin role
        if (user && user.roles && user.roles.some(role => role.toLowerCase() === 'admin')) {
          // Redirect admin to admin dashboard
          navigate('/admin/dashboard');
        } else {
          // Redirect regular users to home page
          navigate('/');
        }
      }
      // If not successful, the error will be displayed in the Alert component
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f0f2f5' 
    }}>
      <Card 
        title="SRM System Login" 
        bordered={false} 
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            closable
            onClose={clearError}
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              style={{ width: '100%', backgroundColor: '#0078D4' }}
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;