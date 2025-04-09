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
import { CapDeTaiData } from '../../models/CapDeTaiData';
import * as CapDeTaiService from '../../services/CapDeTaiService';
import dayjs, { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';

const { Title } = Typography;

const CapDeTaiPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Thêm cấp đề tài');
  const [editingCapDeTai, setEditingCapDeTai] = useState<CapDeTaiData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });  
  
  // Query for fetching cap de tai data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['capDeTais', pagination.current, pagination.pageSize],
    queryFn: async () => {
      const response = await CapDeTaiService.getPage(
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

  // Mutation for creating new cap de tai
  const createMutation = useMutation({
    mutationFn: CapDeTaiService.create,
    onSuccess: () => {
      message.success('Thêm cấp đề tài thành công');
      queryClient.invalidateQueries({ queryKey: ['capDeTais'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi thêm cấp đề tài:', error);
      message.error('Không thể thêm cấp đề tài');
    }
  });

  // Mutation for updating cap de tai
  const updateMutation = useMutation({
    mutationFn: CapDeTaiService.update,
    onSuccess: () => {
      message.success('Cập nhật cấp đề tài thành công');
      queryClient.invalidateQueries({ queryKey: ['capDeTais'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật cấp đề tài:', error);
      message.error('Không thể cập nhật cấp đề tài');
    }
  });

  // Mutation for deleting cap de tai
  const deleteMutation = useMutation({
    mutationFn: CapDeTaiService.remove,
    onSuccess: () => {
      message.success('Xóa cấp đề tài thành công');
      queryClient.invalidateQueries({ queryKey: ['capDeTais'] });
    },
    onError: (error) => {
      console.error('Lỗi khi xóa cấp đề tài:', error);
      message.error('Không thể xóa cấp đề tài');
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
    setEditingCapDeTai(null);
    setModalTitle('Thêm cấp đề tài');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: CapDeTaiData) => {
    setEditingCapDeTai(record);
    setModalTitle('Chỉnh sửa cấp đề tài');
    form.setFieldsValue({
      ten: record.ten
    });
    setModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCapDeTai) {
        // Update existing record
        updateMutation.mutate({
          ...editingCapDeTai,
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
    queryClient.invalidateQueries({ queryKey: ['capDeTais'] });
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
      render: (_: unknown, record: CapDeTaiData) => (
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
              title="Xóa cấp đề tài"
              description="Bạn có chắc muốn xóa cấp đề tài này không?"
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
    ? 'Không thể tải danh sách cấp đề tài. Vui lòng thử lại sau.' 
    : null;

  return (
    <div>
      <Title level={2}>Quản lý Cấp đề tài</Title>
      
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
                Thêm cấp đề tài
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
        title={modalTitle === 'Thêm cấp đề tài' ? 'Thêm cấp đề tài' : 'Chỉnh sửa cấp đề tài'}
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
          name="capDeTaiForm"
        >
          <Form.Item
            name="ten"
            label="Tên cấp đề tài"
            rules={[
              { required: true, message: 'Vui lòng nhập tên cấp đề tài' },
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

export default CapDeTaiPage;