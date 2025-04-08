import React, { useEffect } from 'react';
import { Button, Form, Input, Card, message, Alert } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link } from 'react-router-dom';
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
        message.success('Đăng nhập thành công!');
        
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
      console.error('Lỗi đăng nhập:', err);
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
        title="Đăng nhập Hệ thống SRM" 
        bordered={false} 
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      >
        {error && (
          <Alert
            message="Lỗi đăng nhập"
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
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Tên đăng nhập" 
              size="large"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
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
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/">
            <Button type="link" icon={<HomeOutlined />}>
              Quay lại Trang chủ
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;