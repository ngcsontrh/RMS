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
import { DonViData } from '../../models/DonViData';
import * as DonViService from '../../services/DonViService';
import dayjs, { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';

const { Title } = Typography;

const DonViPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Add Department');
  const [editingDonVi, setEditingDonVi] = useState<DonViData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });  
  
  // Query for fetching don vi data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['donVis', pagination.current, pagination.pageSize],
    queryFn: async () => {
      const response = await DonViService.getPage(
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

  // Mutation for creating new don vi
  const createMutation = useMutation({
    mutationFn: DonViService.create,
    onSuccess: () => {
      message.success('Department added successfully');
      queryClient.invalidateQueries({ queryKey: ['donVis'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Error adding department:', error);
      message.error('Failed to add department');
    }
  });

  // Mutation for updating don vi
  const updateMutation = useMutation({
    mutationFn: DonViService.update,
    onSuccess: () => {
      message.success('Department updated successfully');
      queryClient.invalidateQueries({ queryKey: ['donVis'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Error updating department:', error);
      message.error('Failed to update department');
    }
  });

  // Mutation for deleting don vi
  const deleteMutation = useMutation({
    mutationFn: DonViService.remove,
    onSuccess: () => {
      message.success('Department deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['donVis'] });
    },
    onError: (error) => {
      console.error('Error deleting department:', error);
      message.error('Failed to delete department');
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
    setEditingDonVi(null);
    setModalTitle('Add Department');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: DonViData) => {
    setEditingDonVi(record);
    setModalTitle('Edit Department');
    form.setFieldsValue({
      ten: record.ten
    });
    setModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingDonVi) {
        // Update existing record
        updateMutation.mutate({
          ...editingDonVi,
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
    queryClient.invalidateQueries({ queryKey: ['donVis'] });
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
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
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
      render: (_: unknown, record: DonViData) => (
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
              title="Xóa đơn vị"
              description="Bạn có chắc muốn xóa đơn vị này không?"
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
    ? 'Không thể tải danh sách đơn vị. Vui lòng thử lại sau.' 
    : null;

  return (
    <div>
      <Title level={2}>Quản lý Đơn vị</Title>
      
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
                Thêm đơn vị
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
        title={modalTitle === 'Add Department' ? 'Thêm đơn vị' : 'Chỉnh sửa đơn vị'}
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
          name="donViForm"
        >
          <Form.Item
            name="ten"
            label="Tên đơn vị"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đơn vị' },
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

export default DonViPage;