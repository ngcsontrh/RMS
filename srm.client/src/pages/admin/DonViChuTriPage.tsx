import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Typography,
  Popconfirm,
  message,
  Card,
  Spin,
  Tooltip,
  Row,
  Col,
  Input as AntdInput,
  Alert
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { DonViChuTriData } from '../../models/DonViChuTriData';
import * as DonViChuTriService from '../../services/DonViChuTriService';
import { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';

const { Title } = Typography;
const { Search } = AntdInput;

const DonViChuTriPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Add Host Organization');
  const [editingDonViChuTri, setEditingDonViChuTri] = useState<DonViChuTriData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Search state
  const [searchText, setSearchText] = useState<string>('');
  
  // Query for fetching don vi chu tri data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['donViChuTris', pagination.current, pagination.pageSize, searchText],
    queryFn: async () => {
      const response = await DonViChuTriService.getPage(
        pagination.current, 
        pagination.pageSize
      );
      
      // Apply client-side filtering when searchText is provided
      if (searchText && response.items) {
        const filteredItems = response.items.filter(item => 
          item.ten?.toLowerCase().includes(searchText.toLowerCase())
        );
        return {
          ...response,
          items: filteredItems,
          total: filteredItems.length
        };
      }
      
      return response;
    }
  });

  // Update pagination when data changes
  useEffect(() => {
    if (data) {
      setPagination(prev => ({
        ...prev,
        total: data.total
      }));
    }
  }, [data]);

  // Mutation for creating new don vi chu tri
  const createMutation = useMutation({
    mutationFn: DonViChuTriService.create,
    onSuccess: () => {
      message.success('Host organization added successfully');
      queryClient.invalidateQueries({ queryKey: ['donViChuTris'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Error adding host organization:', error);
      message.error('Failed to add host organization');
    }
  });

  // Mutation for updating don vi chu tri
  const updateMutation = useMutation({
    mutationFn: DonViChuTriService.update,
    onSuccess: () => {
      message.success('Host organization updated successfully');
      queryClient.invalidateQueries({ queryKey: ['donViChuTris'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Error updating host organization:', error);
      message.error('Failed to update host organization');
    }
  });

  // Mutation for deleting don vi chu tri
  const deleteMutation = useMutation({
    mutationFn: DonViChuTriService.remove,
    onSuccess: () => {
      message.success('Host organization deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['donViChuTris'] });
    },
    onError: (error) => {
      console.error('Error deleting host organization:', error);
      message.error('Failed to delete host organization');
    }
  });

  // Handle table change (pagination, filters)
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(prev => ({
      ...prev,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10
    }));
  };

  // Search functionality
  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination(prev => ({
      ...prev,
      current: 1 // Reset to first page when searching
    }));
  };

  // Handle add button click
  const handleAddClick = () => {
    setEditingDonViChuTri(null);
    setModalTitle('Add Host Organization');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: DonViChuTriData) => {
    setEditingDonViChuTri(record);
    setModalTitle('Edit Host Organization');
    form.setFieldsValue({
      ten: record.ten
    });
    setModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingDonViChuTri) {
        // Update existing record
        updateMutation.mutate({
          ...editingDonViChuTri,
          ten: values.ten
        });
      } else {
        // Create new record
        createMutation.mutate({
          ten: values.ten
        });
      }
    } catch (error) {
      console.error('Form validation error:', error);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Refresh data
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['donViChuTris'] });
    message.info('Data refreshed');
  };

  // Table columns configuration
  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_: unknown, __: unknown, index: number) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Created Date',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (date: Date) => formatDate(date, 'DD/MM/YYYY HH:mm')
    },
    {
      title: 'Last Modified',
      dataIndex: 'ngaySua',
      key: 'ngaySua',
      render: (date: Date) => formatDate(date, 'DD/MM/YYYY HH:mm')
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: DonViChuTriData) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={() => handleEditClick(record)} 
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Host Organization"
              description="Are you sure you want to delete this host organization?"
              onConfirm={() => handleDelete(record.id!)}
              okText="Yes"
              cancelText="No"
              icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
            >
              <Button 
                type="primary" 
                danger 
                icon={<DeleteOutlined />} 
                size="small"
                loading={deleteMutation.isPending && deleteMutation.variables === record.id}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      )
    }
  ];

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const errorMessage = queryError 
    ? 'Failed to load host organizations. Please try again later.' 
    : null;

  return (
    <div>
      <Title level={2}>Host Organizations Management</Title>
      
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Search by name"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} sm={12} md={16} lg={18} style={{ textAlign: 'right' }}>
            <Space>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={refreshData}
                loading={isLoading}
              >
                Refresh
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddClick}
              >
                Add Host Organization
              </Button>
            </Space>
          </Col>
        </Row>

        {isError && errorMessage && (
          <div style={{ marginBottom: 16 }}>
            <Alert message={errorMessage} type="error" showIcon />
          </div>
        )}

        <Spin spinning={isLoading}>
          <Table
            dataSource={data?.items || []}
            columns={columns}
            rowKey="id"
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `Total ${total} items`
            }}
            onChange={handleTableChange}
          />
        </Spin>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal
        title={modalTitle}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="donViChuTriForm"
        >
          <Form.Item
            name="ten"
            label="Host Organization Name"
            rules={[
              { required: true, message: 'Please enter the host organization name' },
              { max: 100, message: 'Name cannot exceed 100 characters' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DonViChuTriPage;