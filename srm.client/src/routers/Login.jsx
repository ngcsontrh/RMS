import React, { useState } from 'react';
import { Card, Form, Input, Button, Checkbox, Typography, Alert, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

/**
 * @typedef {Object} LoginCredentials
 * @property {string} username - Tên đăng nhập của người dùng
 * @property {string} password - Mật khẩu của người dùng
 * @property {boolean} remember - Ghi nhớ đăng nhập
 */

/**
 * Component Login form
 * @returns {JSX.Element} Login form component
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Xử lý đăng nhập
   * @param {LoginCredentials} values - Dữ liệu đăng nhập
   */
  const handleLogin = (values) => {
    setLoading(true);
    setError('');
    
    // Mô phỏng gọi API đăng nhập
    setTimeout(() => {
      setLoading(false);
      
      // Mô phỏng xác thực thành công/thất bại
      if (values.username === 'admin' && values.password === 'password') {
        // Lưu token vào localStorage
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          username: values.username,
          name: 'Người dùng Admin',
          role: 'admin'
        }));
        
        // Chuyển hướng đến trang chủ
        navigate('/');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh' 
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px' }}>Đăng nhập</Title>
          <p>Hệ thống quản lý nghiên cứu khoa học DHTL</p>
        </div>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: '16px' }} 
          />
        )}
        
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Tên đăng nhập" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Mật khẩu" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item>
            <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%', display: 'flex' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a href="#">Quên mật khẩu?</a>
            </Space>
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%' }} 
              size="large"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;