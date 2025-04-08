import React from 'react';
import { Typography, Card, Row, Col, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ContactPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Thông tin liên hệ</Title>
      <Divider />
      
      <Card bordered={false}>
        <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
          Mọi chi tiết xin gửi về
        </Paragraph>
        
        <Row gutter={[16, 24]}>
          <Col xs={24} sm={24} md={8}>
            <Card
              style={{ height: '100%' }}
              bordered
              hoverable
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <EnvironmentOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '16px', marginTop: '4px' }} />
                <div>
                  <Title level={4}>Địa chỉ</Title>
                  <Paragraph>
                    175 Tây Sơn, Đống Đa, Hà Nội
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{ height: '100%' }}
              bordered
              hoverable
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '16px', marginTop: '4px' }} />
                <div>
                  <Title level={4}>Điện thoại</Title>
                  <Paragraph>
                    35641053; 38534198
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{ height: '100%' }}
              bordered
              hoverable
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <MailOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '16px', marginTop: '4px' }} />
                <div>
                  <Title level={4}>Email</Title>
                  <Paragraph>
                    khcn@tlu.edu.vn
                  </Paragraph>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactPage;