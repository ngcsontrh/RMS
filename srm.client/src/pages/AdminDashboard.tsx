import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Button, DatePicker } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  FileOutlined, 
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { formatDate } from '../utils/dateTime';

const { Title } = Typography;
const { RangePicker } = DatePicker;

// Mock data for the dashboard
const recentResearchData = [
  {
    key: '1',
    title: 'Ứng dụng AI trong Y tế',
    investigator: 'TS. Nguyễn Văn A',
    status: 'Đang thực hiện',
    date: '2025-03-15',
  },
  {
    key: '2',
    title: 'Tính toán lượng tử cho Mật mã học',
    investigator: 'TS. Trần Văn B',
    status: 'Hoàn thành',
    date: '2025-02-28',
  },
  {
    key: '3',
    title: 'Giải pháp năng lượng bền vững',
    investigator: 'TS. Lê Thị C',
    status: 'Chờ phê duyệt',
    date: '2025-04-10',
  },
  {
    key: '4',
    title: 'Phát triển vật liệu tiên tiến',
    investigator: 'TS. Phạm Văn D',
    status: 'Đang thực hiện',
    date: '2025-03-22',
  },
];

const recentUsersData = [
  {
    key: '1',
    name: 'Nguyễn Văn A',
    department: 'Khoa Công nghệ thông tin',
    role: 'Giảng viên',
    joinDate: '2025-03-15',
  },
  {
    key: '2',
    name: 'Trần Thị B',
    department: 'Khoa Hóa học',
    role: 'Nghiên cứu viên',
    joinDate: '2025-03-10',
  },
  {
    key: '3',
    name: 'Lê Văn C',
    department: 'Khoa Vật lý',
    role: 'Giảng viên',
    joinDate: '2025-02-28',
  },
  {
    key: '4',
    name: 'Phạm Thị D',
    department: 'Khoa Điện tử',
    role: 'Quản trị viên',
    joinDate: '2025-02-15',
  },
];

const AdminDashboard: React.FC = () => {
  // Column definitions for research table
  const researchColumns = [
    {
      title: 'Tên đề tài',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Chủ nhiệm đề tài',
      dataIndex: 'investigator',
      key: 'investigator',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === 'Đang thực hiện') color = 'blue';
        else if (status === 'Hoàn thành') color = 'green';
        else if (status === 'Chờ phê duyệt') color = 'gold';
        
        return <span style={{ color }}>{status}</span>;
      }
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      // Only formatting dates when displayed in the table
      render: (date: string) => formatDate(date, 'DD MMM YYYY')
    },
  ];

  // Column definitions for users table
  const userColumns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
      key: 'joinDate',
      // Only formatting dates when displayed in the table
      render: (date: string) => formatDate(date, 'DD MMM YYYY')
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2}>Bảng điều khiển quản trị</Title>
        <RangePicker />
      </div>
      
      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={125}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 15% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đề tài nghiên cứu"
              value={42}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 8% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Công bố"
              value={87}
              prefix={<FileOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#cf1322' }}>
                <ArrowDownOutlined /> 3% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đơn vị"
              value={18}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 12% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>So với tháng trước</span>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Research Projects */}
      <Card 
        title="Đề tài nghiên cứu gần đây" 
        extra={<Button type="link">Xem tất cả</Button>}
        style={{ marginBottom: 24 }}
      >
        <Table 
          dataSource={recentResearchData} 
          columns={researchColumns} 
          pagination={false} 
        />
      </Card>
      
      {/* Recent Users */}
      <Card 
        title="Người dùng mới thêm gần đây" 
        extra={<Button type="link">Xem tất cả</Button>}
      >
        <Table 
          dataSource={recentUsersData} 
          columns={userColumns} 
          pagination={false} 
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;