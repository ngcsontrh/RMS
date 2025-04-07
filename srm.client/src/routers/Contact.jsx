import React from 'react';
import { Card, Typography, Row, Col, Divider } from 'antd';
import { MailOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Contact = () => {
  return (
    <Card>
      <Title level={2}>THÔNG TIN LIÊN HỆ</Title>
      <Divider />
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Title level={4}>Mọi chi tiết xin gửi về</Title>
          <Paragraph>
            <MailOutlined style={{ marginRight: 8 }} />
            <Text strong>Email:</Text>
            <br />
            <Text style={{ marginLeft: 24 }}>khcn@tlu.edu.vn</Text>
            <br />
            <Text style={{ marginLeft: 24 }}>nckh@tlu.edu.vn</Text>
          </Paragraph>
          
          <Paragraph style={{ marginTop: 16 }}>
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            <Text strong>Địa chỉ:</Text>
            <br />
            <Text style={{ marginLeft: 24 }}>Phòng 504, 506, 508 - Nhà A1, Số 175 Tây Sơn - Đống Đa - Hà Nội</Text>
          </Paragraph>
          
          <Paragraph style={{ marginTop: 16 }}>
            <PhoneOutlined style={{ marginRight: 8 }} />
            <Text strong>Điện thoại:</Text>
            <br />
            <Text style={{ marginLeft: 24 }}>35641053; 38534198</Text>
          </Paragraph>
        </Col>
        
        <Col xs={24} md={12}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6408878862984!2d105.82142237497602!3d21.007025888593252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac8109765ba5%3A0xd84740ece05680ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7p3kgbOG7o2k!5e0!3m2!1svi!2s!4v1712642147097!5m2!1svi!2s" 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Trường Đại học Thủy lợi"
          />
        </Col>
      </Row>
      
      <Divider />
      
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Text>© 2025 . Trường Đại học Thủy lợi</Text>
        <br />
        <Text>Số 175, Tây Sơn, Đống Đa, Hà Nội</Text>
      </div>
    </Card>
  );
};

export default Contact;