import React from 'react';
import { Typography, Divider, Space } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ContactItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  }}>
    <div style={{ 
      fontSize: '24px', 
      color: '#0078D4', 
      marginRight: '16px', 
      marginTop: '4px' 
    }}>
      {icon}
    </div>
    <div>
      <Title level={4}>{title}</Title>
      <Paragraph style={{ margin: 0 }}>
        {children}
      </Paragraph>
    </div>
  </div>
);

const ContactPage: React.FC = () => {
  return (
    <div className="page-container">
      <Title level={2} style={{ marginBottom: '20px', color: '#0078D4' }}>
        THÔNG TIN LIÊN HỆ
      </Title>
      <Divider style={{ margin: '16px 0 24px' }} />
      
      <Paragraph style={{ fontSize: '16px', marginBottom: '24px', fontWeight: '500' }}>
        Mọi chi tiết xin gửi về
      </Paragraph>
      
      <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '30px' }}>
        <ContactItem icon={<EnvironmentOutlined />} title="Địa chỉ">
          Phòng 504, 506, 508 - Nhà A1, Số 175 Tây Sơn - Đống Đa - Hà Nội
        </ContactItem>
        
        <ContactItem icon={<PhoneOutlined />} title="Điện thoại">
          35641053; 38534198
        </ContactItem>

        <ContactItem icon={<MailOutlined />} title="Email">
          <a href="mailto:khcn@tlu.edu.vn">khcn@tlu.edu.vn</a>
        </ContactItem>
      </Space>
      
      <div style={{ 
        borderTop: '1px solid #f0f0f0',
        paddingTop: '20px',
        marginTop: '20px'
      }}>
        <Title level={3} style={{ color: '#0078D4', margin: 0, marginBottom: '16px' }}>
          Trường Đại học Thủy lợi
        </Title>
        <Paragraph>
          <Text strong>© {new Date().getFullYear()} . Trường Đại học Thủy lợi</Text>
          <br />
          Số 175, Tây Sơn, Đống Đa, Hà Nội
        </Paragraph>
      </div>
    </div>
  );
};

export default ContactPage;