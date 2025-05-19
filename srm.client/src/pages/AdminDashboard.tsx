import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Button, DatePicker, Spin, Alert, Empty, Tabs } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  FileOutlined, 
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { formatDate } from '../utils/dateTime';
import { useQuery } from '@tanstack/react-query';
import * as UserService from '../services/UserService';
import * as DeTaiService from '../services/DeTaiService';
import * as CongBoService from '../services/CongBoService';
import * as DonViService from '../services/DonViService';
import { DeTaiData } from '../models/DeTaiData';
import { UserData } from '../models/UserData';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageData } from '../models/PageData';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// Số lượng mục hiển thị trong các bảng
const TABLE_LIMIT = 5;

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes('admin');
  
  // State cho date range filter
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  
  // Các query để fetch dữ liệu cho dashboard
  
  // Query cho users
  const {
    data: userData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: usersError
  } = useQuery({
    queryKey: ['users', 1, TABLE_LIMIT],
    queryFn: () => UserService.getPage(1, TABLE_LIMIT),
    staleTime: 5 * 60 * 1000, // 5 phút
    enabled: isAdmin // Chỉ fetch dữ liệu users nếu là admin
  });

  // Query cho đề tài
  const {
    data: deTaiData,
    isLoading: isLoadingDeTai,
    isError: isErrorDeTai,
    error: deTaiError
  } = useQuery({
    queryKey: ['detais', 1, TABLE_LIMIT],
    queryFn: () => DeTaiService.getPage(1, TABLE_LIMIT),
    staleTime: 5 * 60 * 1000 // 5 phút
  });

  // Query cho công bố
  const {
    data: congBoData,
    isLoading: isLoadingCongBo,
    isError: isErrorCongBo,
    error: congBoError
  } = useQuery({
    queryKey: ['congbos', 1, TABLE_LIMIT],
    queryFn: () => CongBoService.getPage(1, TABLE_LIMIT),
    staleTime: 5 * 60 * 1000 // 5 phút
  });

  // Query cho đơn vị (chỉ lấy số lượng)
  const {
    data: donViCount,
    isLoading: isLoadingDonVi,
    isError: isErrorDonVi,
    error: donViError
  } = useQuery({
    queryKey: ['donvis', 'count'],
    queryFn: async () => {
      const data = await DonViService.getPage(1, 1);
      return data.total;
    },
    staleTime: 5 * 60 * 1000 // 5 phút
  });

  // Handle date range change
  const handleDateRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
      // Thực tế, bạn sẽ cần triển khai logic filter theo date range
      // trong backend API của bạn
    } else {
      setDateRange(null);
    }
  };
  
  // Reset filters
  const handleReset = () => {
    setDateRange(null);
  };
  
  // Navigate to related pages
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Column definitions for research projects table
  const researchColumns = [
    {
      title: 'Tên đề tài',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string, record: DeTaiData) => (
        <a onClick={() => navigateTo(`/detai/${record.id}`)}>{text}</a>
      )
    },
    {
      title: 'Chủ nhiệm đề tài',
      dataIndex: 'chuNhiem',
      key: 'chuNhiem',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThaiPheDuyet',
      key: 'trangThaiPheDuyet',
      render: (status: string) => {
        let color = '';
        let displayStatus = '';
        
        if (status === 'APPROVE') {
          color = 'green';
          displayStatus = 'Đã phê duyệt';
        }
        else {
          color = 'blue';
          displayStatus = 'Đợi phê duyệt';
        }
        return <span style={{ color }}>{displayStatus}</span>;
      }
    }
  ];

  // Column definitions for users table
  const userColumns = [
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'tenDonVi',
      key: 'tenDonVi',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (date: dayjs.Dayjs) => formatDate(date, 'DD/MM/YYYY')
    },
  ];

  // Column definitions for publications table
  const congBoColumns = [
    {
      title: 'Tên công bố',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string, record: any) => (
        <a onClick={() => navigateTo(`/congbo/${record.id}`)}>{text}</a>
      )
    },
    {
      title: 'Tác giả',
      dataIndex: 'tacGiaChinh',
      key: 'tacGiaChinh',
    },
    {
      title: 'Nơi đăng báo',
      dataIndex: 'tenNoiDangBao',
      key: 'tenNoiDangBao',
    },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'ngayCongBo',
      key: 'ngayCongBo',
      render: (date: dayjs.Dayjs) => formatDate(date, 'DD/MM/YYYY')
    },
  ];

  // Tính toán mức tăng trưởng giả lập (chỉ cho mục đích hiển thị)
  // Trong thực tế, dữ liệu này nên được tính toán từ API
  const calculateGrowth = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) * (Math.random() > 0.7 ? -1 : 1) + min;
  };

  // Loading state
  const isLoading = isLoadingUsers || isLoadingDeTai || isLoadingCongBo || isLoadingDonVi;
  
  // Error state
  const hasErrors = isErrorUsers || isErrorDeTai || isErrorCongBo || isErrorDonVi;
  const errorMessages = [];
  
  if (isErrorUsers) errorMessages.push(`Không thể tải dữ liệu người dùng: ${usersError}`);
  if (isErrorDeTai) errorMessages.push(`Không thể tải dữ liệu đề tài: ${deTaiError}`);
  if (isErrorCongBo) errorMessages.push(`Không thể tải dữ liệu công bố: ${congBoError}`);
  if (isErrorDonVi) errorMessages.push(`Không thể tải dữ liệu đơn vị: ${donViError}`);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (hasErrors) {
    return (
      <Alert
        message="Lỗi khi tải dữ liệu"
        description={
          <ul>
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        }
        type="error"
        showIcon
      />
    );
  }

  // Format the title based on user role
  const dashboardTitle = isAdmin ? "Bảng điều khiển quản trị" : "Bảng điều khiển cá nhân";

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap' }}>
        <Title level={2}>{dashboardTitle}</Title>
        <div>
          <RangePicker 
            onChange={handleDateRangeChange} 
            value={dateRange} 
            style={{ marginRight: 8 }}
          />
          <Button onClick={handleReset} disabled={!dateRange}>
            Xóa bộ lọc
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={userData?.total || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ 
                fontSize: 14, 
                color: calculateGrowth(1, 15) >= 0 ? '#3f8600' : '#cf1322' 
              }}>
                {calculateGrowth(1, 15) >= 0 ? 
                  <ArrowUpOutlined /> : 
                  <ArrowDownOutlined />
                } {Math.abs(calculateGrowth(1, 15))}% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đề tài nghiên cứu"
              value={deTaiData?.total || 0}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ 
                fontSize: 14, 
                color: calculateGrowth(1, 12) >= 0 ? '#3f8600' : '#cf1322' 
              }}>
                {calculateGrowth(1, 12) >= 0 ? 
                  <ArrowUpOutlined /> : 
                  <ArrowDownOutlined />
                } {Math.abs(calculateGrowth(1, 12))}% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Công bố"
              value={congBoData?.total || 0}
              prefix={<FileOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ 
                fontSize: 14, 
                color: calculateGrowth(1, 10) >= 0 ? '#3f8600' : '#cf1322' 
              }}>
                {calculateGrowth(1, 10) >= 0 ? 
                  <ArrowUpOutlined /> : 
                  <ArrowDownOutlined />
                } {Math.abs(calculateGrowth(1, 10))}% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Đơn vị"
              value={donViCount || 0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ 
                fontSize: 14, 
                color: calculateGrowth(1, 5) >= 0 ? '#3f8600' : '#cf1322' 
              }}>
                {calculateGrowth(1, 5) >= 0 ? 
                  <ArrowUpOutlined /> : 
                  <ArrowDownOutlined />
                } {Math.abs(calculateGrowth(1, 5))}% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Data Tabs */}
      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={
            <span>
              <BookOutlined />
              Đề tài nghiên cứu
            </span>
          }
          key="1"
        >
          <Card 
            title="Đề tài nghiên cứu gần đây" 
            extra={
              <Button type="link" onClick={() => navigateTo(isAdmin ? '/admin/detai' : '/detai')}>
                Xem tất cả
              </Button>
            }
          >
            <Table 
              dataSource={deTaiData?.items || []} 
              columns={researchColumns} 
              pagination={false}
              rowKey="id" 
              loading={isLoadingDeTai}
            />
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <FileOutlined />
              Công bố khoa học
            </span>
          } 
          key="2"
        >
          <Card 
            title="Công bố gần đây" 
            extra={
              <Button type="link" onClick={() => navigateTo(isAdmin ? '/admin/congbo' : '/congbo')}>
                Xem tất cả
              </Button>
            }
          >
            <Table 
              dataSource={congBoData?.items || []} 
              columns={congBoColumns}
              pagination={false} 
              rowKey="id"
              loading={isLoadingCongBo}
            />
          </Card>
        </TabPane>
        
        {isAdmin && (
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Người dùng
              </span>
            } 
            key="3"
          >
            <Card 
              title="Người dùng mới thêm gần đây" 
              extra={
                <Button type="link" onClick={() => navigateTo('/admin/users')}>
                  Xem tất cả
                </Button>
              }
            >
              <Table 
                dataSource={userData?.items || []} 
                columns={userColumns} 
                pagination={false}
                rowKey="id" 
                loading={isLoadingUsers}
              />
            </Card>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;