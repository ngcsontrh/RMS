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
  Alert
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { RoleData } from '../../models/RoleData';
import * as RoleService from '../../services/RoleService';
import dayjs, { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';

const { Title } = Typography;

const RolePage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Add Role');
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Query for fetching roles data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['roles', pagination.current, pagination.pageSize],
    queryFn: async () => {
      const response = await RoleService.getPage(
        pagination.current, 
        pagination.pageSize
      );      
      
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

  // Mutation for creating new role
  const createMutation = useMutation({
    mutationFn: RoleService.create,
    onSuccess: () => {
      message.success('Vai trò đã được thêm thành công');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi thêm vai trò:', error);
      message.error('Không thể thêm vai trò');
    }
  });

  // Mutation for updating role
  const updateMutation = useMutation({
    mutationFn: RoleService.update,
    onSuccess: () => {
      message.success('Vai trò đã được cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật vai trò:', error);
      message.error('Không thể cập nhật vai trò');
    }
  });

  // Mutation for deleting role
  const deleteMutation = useMutation({
    mutationFn: RoleService.remove,
    onSuccess: () => {
      message.success('Vai trò đã được xóa thành công');
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (error) => {
      console.error('Lỗi khi xóa vai trò:', error);
      message.error('Không thể xóa vai trò');
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

  // Handle add button click
  const handleAddClick = () => {
    setEditingRole(null);
    setModalTitle('Thêm vai trò');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: RoleData) => {
    setEditingRole(record);
    setModalTitle('Chỉnh sửa vai trò');
    form.setFieldsValue({
      name: record.name
    });
    setModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingRole) {
        // Update existing record
        updateMutation.mutate({
          ...editingRole,
          name: values.name
        });
      } else {
        // Create new record
        createMutation.mutate({
          name: values.name
        });
      }
    } catch (error) {
      console.error('Lỗi xác thực biểu mẫu:', error);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Refresh data
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['roles'] });
    message.info('Dữ liệu đã được làm mới');
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
      title: 'Tên vai trò',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
      render: (date: dayjs.Dayjs) => formatDate(date, 'DD/MM/YYYY HH:mm') 
    },
    {
      title: 'Cập nhật gần nhất',
      dataIndex: 'ngaySua',
      key: 'ngaySua',
      render: (date: dayjs.Dayjs) => formatDate(date, 'DD/MM/YYYY HH:mm') 
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: unknown, record: RoleData) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={() => handleEditClick(record)} 
              size="small"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa vai trò"
              description="Bạn có chắc muốn xóa vai trò này không?"
              onConfirm={() => handleDelete(record.id!)}
              okText="Có"
              cancelText="Không"
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
    ? 'Không thể tải danh sách vai trò. Vui lòng thử lại sau.' 
    : null;

  return (
    <div>
      <Title level={2}>Quản lý Vai trò</Title>
      
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}></Col>
          <Col xs={24} sm={12} md={16} lg={18} style={{ textAlign: 'right' }}>
            <Space>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={refreshData}
                loading={isLoading}
              >
                Làm mới
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddClick}
              >
                Thêm vai trò
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
              showTotal: (total) => `Tổng cộng ${total} mục`
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
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmitting}
            onClick={handleFormSubmit}
          >
            Lưu
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="roleForm"
        >
          <Form.Item
            name="name"
            label="Tên vai trò"
            rules={[
              { required: true, message: 'Vui lòng nhập tên vai trò' },
              { max: 100, message: 'Tên không được vượt quá 100 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RolePage;