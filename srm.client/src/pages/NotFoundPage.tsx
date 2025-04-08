import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang truy cập không tồn tại."
      extra={
        <Button 
          type="primary" 
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#0078D4' }}
        >
          Quay lại Trang chủ
        </Button>
      }
    />
  );
};

export default NotFoundPage;