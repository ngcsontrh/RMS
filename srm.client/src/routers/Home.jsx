import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Statistic, List, Button, Space, Divider } from 'antd';
import { BookOutlined, FileTextOutlined, TeamOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import deTaiService from '../services/deTaiService';
import congBoService from '../services/congBoService';
import hoatDongService from '../services/hoatDongService';

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  const [stats, setStats] = useState({
    deTai: 0,
    congBo: 0,
    hoatDong: 0
  });
  const [recentDeTai, setRecentDeTai] = useState([]);
  const [recentCongBo, setRecentCongBo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch statistics
        const [deTaiData, congBoData, hoatDongData] = await Promise.all([
          deTaiService.getPage(0, 1),
          congBoService.getPage(0, 1),
          hoatDongService.getPage(0, 1)
        ]);

        setStats({
          deTai: deTaiData.data.total || 0,
          congBo: congBoData.data.total || 0,
          hoatDong: hoatDongData.data.total || 0
        });

        // Fetch recent research topics
        const recentTopicsResponse = await deTaiService.getPage(0, 5);
        setRecentDeTai(recentTopicsResponse.data.items || []);

        // Fetch recent publications
        const recentPublicationsResponse = await congBoService.getPage(0, 5);
        setRecentCongBo(recentPublicationsResponse.data.items || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Card loading={loading}>
      <Title level={2}>Hệ thống quản lý nghiên cứu khoa học DHTL</Title>
      <Paragraph>
        Chào mừng đến với hệ thống quản lý nghiên cứu khoa học của Trường Đại học Thủy lợi. 
        Hệ thống này giúp quản lý, theo dõi và báo cáo các hoạt động nghiên cứu khoa học của trường.
      </Paragraph>

      <Divider />

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="Đề tài nghiên cứu" 
              value={stats.deTai} 
              prefix={<BookOutlined />} 
            />
            <Button 
              type="link" 
              style={{ padding: 0, marginTop: 8 }}
              onClick={() => navigateTo('/school/topics')}
            >
              Xem chi tiết <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="Công bố khoa học" 
              value={stats.congBo} 
              prefix={<FileTextOutlined />} 
            />
            <Button 
              type="link" 
              style={{ padding: 0, marginTop: 8 }}
              onClick={() => navigateTo('/school/publications')}
            >
              Xem chi tiết <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title="Hoạt động khác" 
              value={stats.hoatDong} 
              prefix={<CalendarOutlined />} 
            />
            <Button 
              type="link" 
              style={{ padding: 0, marginTop: 8 }}
              onClick={() => navigateTo('/school/other-activities')}
            >
              Xem chi tiết <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Recent activities */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Đề tài nghiên cứu gần đây">
            <List
              dataSource={recentDeTai}
              renderItem={(item) => (
                <List.Item>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>{item.ten}</Text>
                    <Text type="secondary">Chủ nhiệm: {item.chuNhiem}</Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">{item.tenCapDeTai}</Text>
                      <Button 
                        type="link" 
                        size="small"
                        onClick={() => navigateTo(`/school/topics/${item.id}`)}
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </Space>
                </List.Item>
              )}
              locale={{ emptyText: "Không có đề tài nào" }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Công bố khoa học gần đây">
            <List
              dataSource={recentCongBo}
              renderItem={(item) => (
                <List.Item>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>{item.ten}</Text>
                    <Text type="secondary">Tác giả chính: {item.tacGiaChinh}</Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">{item.tenNoiDangBao}</Text>
                      <Button 
                        type="link" 
                        size="small"
                        onClick={() => navigateTo(`/school/publications/${item.id}`)}
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </Space>
                </List.Item>
              )}
              locale={{ emptyText: "Không có công bố nào" }}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Home;