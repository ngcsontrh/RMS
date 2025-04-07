import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Card, Typography, Input, Select, DatePicker, message } from 'antd';
import { SearchOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * Generic data list component for displaying either school or personal data
 * @param {Object} props Component props
 * @param {string} props.title Title of the list
 * @param {string} props.type Type of data (detai, congbo, hoatdong)
 * @param {string} props.scope Scope of data (school, personal)
 * @param {Function} props.serviceFunction Service function to fetch data
 * @param {Array} props.columns Table columns configuration
 */
const DataList = ({ title, type, scope, serviceFunction, columns }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  
  const navigate = useNavigate();

  // Fetch data from API
  const fetchData = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await serviceFunction(page, pageSize);
      setData(response.data.items);
      setPagination({
        ...pagination,
        current: page,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Không thể tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Handle table change (pagination, filters, sorter)
  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  // Handle view detail action
  const handleViewDetail = (id) => {
    navigate(`/${scope}/${type}/${id}`);
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/${scope}/${type}/${id}/edit`);
  };

  // Handle add new action
  const handleAddNew = () => {
    navigate(`/${scope}/${type}/new`);
  };

  // Add action column to the columns
  const columnsWithActions = [
    ...columns,
    {
      title: 'Thao tác',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record.id)}
            title="Xem chi tiết"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
            title="Chỉnh sửa"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>{title}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddNew}
        >
          Thêm mới
        </Button>
      </div>
      
      <Table
        columns={columnsWithActions}
        dataSource={data}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 1000 }}
      />
    </Card>
  );
};

export default DataList;