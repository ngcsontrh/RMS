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
    title: 'AI in Healthcare Applications',
    investigator: 'Dr. Alice Johnson',
    status: 'In Progress',
    date: '2025-03-15',
  },
  {
    key: '2',
    title: 'Quantum Computing for Cryptography',
    investigator: 'Dr. Bob Smith',
    status: 'Completed',
    date: '2025-02-28',
  },
  {
    key: '3',
    title: 'Sustainable Energy Solutions',
    investigator: 'Dr. Carol Williams',
    status: 'Pending Approval',
    date: '2025-04-01',
  },
  {
    key: '4',
    title: 'Nanoparticles for Drug Delivery',
    investigator: 'Dr. David Brown',
    status: 'In Progress',
    date: '2025-03-22',
  },
];

const recentUsersData = [
  {
    key: '1',
    name: 'John Doe',
    department: 'Computer Science',
    role: 'Researcher',
    joinDate: '2025-03-30',
  },
  {
    key: '2',
    name: 'Emily Wilson',
    department: 'Physics',
    role: 'Administrator',
    joinDate: '2025-03-28',
  },
  {
    key: '3',
    name: 'Mark Taylor',
    department: 'Biology',
    role: 'Researcher',
    joinDate: '2025-03-25',
  },
];

const AdminDashboard: React.FC = () => {
  // Column definitions for research table
  const researchColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Principal Investigator',
      dataIndex: 'investigator',
      key: 'investigator',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === 'In Progress') color = 'blue';
        else if (status === 'Completed') color = 'green';
        else if (status === 'Pending Approval') color = 'gold';
        
        return <span style={{ color }}>{status}</span>;
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // Only formatting dates when displayed in the table
      render: (date: string) => formatDate(date, 'DD MMM YYYY')
    },
  ];

  // Column definitions for users table
  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      // Only formatting dates when displayed in the table
      render: (date: string) => formatDate(date, 'DD MMM YYYY')
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={2}>Admin Dashboard</Title>
        <RangePicker />
      </div>
      
      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={125}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 15% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>Since last month</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Research Projects"
              value={42}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 8% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>Since last month</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Publications"
              value={87}
              prefix={<FileOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#cf1322' }}>
                <ArrowDownOutlined /> 3% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>Since last month</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Departments"
              value={18}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#0078D4' }}
            />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 14, color: '#3f8600' }}>
                <ArrowUpOutlined /> 12% 
              </span>
              <span style={{ fontSize: 14, marginLeft: 8 }}>Since last month</span>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Research Projects */}
      <Card 
        title="Recent Research Projects" 
        extra={<Button type="link">View All</Button>}
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
        title="Recently Added Users" 
        extra={<Button type="link">View All</Button>}
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