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
import { LoaiHoatDongData } from '../../models/LoaiHoatDongData';
import * as LoaiHoatDongService from '../../services/LoaiHoatDongService';
import dayjs, { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';

const { Title } = Typography;

const LoaiHoatDongPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Thêm loại hoạt động');
  const [editingLoaiHoatDong, setEditingLoaiHoatDong] = useState<LoaiHoatDongData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Query for fetching activity type data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['loaiHoatDongs', pagination.current, pagination.pageSize],
    queryFn: async () => {
      const response = await LoaiHoatDongService.getPage(
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

  // Mutation for creating new activity type
  const createMutation = useMutation({
    mutationFn: LoaiHoatDongService.create
  });

  // Effect to handle createMutation success
  useEffect(() => {
    if (createMutation.isSuccess) {
      message.success('Thêm loại hoạt động thành công');
      queryClient.invalidateQueries({ queryKey: ['loaiHoatDongs'] });
      setModalVisible(false);
      form.resetFields();
    }
  }, [createMutation.isSuccess, queryClient, form]);

  // Effect to handle createMutation error
  useEffect(() => {
    if (createMutation.isError) {
      console.error('Lỗi khi thêm loại hoạt động:', createMutation.error);
      message.error('Không thể thêm loại hoạt động');
    }
  }, [createMutation.isError, createMutation.error]);

  // Mutation for updating activity type
  const updateMutation = useMutation({
    mutationFn: LoaiHoatDongService.update
  });

  // Effect to handle updateMutation success
  useEffect(() => {
    if (updateMutation.isSuccess) {
      message.success('Cập nhật loại hoạt động thành công');
      queryClient.invalidateQueries({ queryKey: ['loaiHoatDongs'] });
      setModalVisible(false);
      form.resetFields();
    }
  }, [updateMutation.isSuccess, queryClient, form]);

  // Effect to handle updateMutation error
  useEffect(() => {
    if (updateMutation.isError) {
      console.error('Lỗi khi cập nhật loại hoạt động:', updateMutation.error);
      message.error('Không thể cập nhật loại hoạt động');
    }
  }, [updateMutation.isError, updateMutation.error]);

  // Mutation for deleting activity type
  const deleteMutation = useMutation({
    mutationFn: LoaiHoatDongService.remove
  });

  // Effect to handle deleteMutation success
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      message.success('Xóa loại hoạt động thành công');
      queryClient.invalidateQueries({ queryKey: ['loaiHoatDongs'] });
    }
  }, [deleteMutation.isSuccess, queryClient]);

  // Effect to handle deleteMutation error
  useEffect(() => {
    if (deleteMutation.isError) {
      console.error('Lỗi khi xóa loại hoạt động:', deleteMutation.error);
      message.error('Không thể xóa loại hoạt động');
    }
  }, [deleteMutation.isError, deleteMutation.error]);

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
    setEditingLoaiHoatDong(null);
    setModalTitle('Thêm loại hoạt động');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: LoaiHoatDongData) => {
    setEditingLoaiHoatDong(record);
    setModalTitle('Chỉnh sửa loại hoạt động');
    form.setFieldsValue({
      ten: record.ten
    });
    setModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingLoaiHoatDong) {
        // Update existing record
        updateMutation.mutate({
          ...editingLoaiHoatDong,
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
    queryClient.invalidateQueries({ queryKey: ['loaiHoatDongs'] });
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
      title: 'Ngày sửa',
      dataIndex: 'ngaySua',
      key: 'ngaySua',
      render: (date: dayjs.Dayjs) => formatDate(date, 'DD/MM/YYYY HH:mm')
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: unknown, record: LoaiHoatDongData) => (
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
              title="Xóa loại hoạt động"
              description="Bạn có chắc chắn muốn xóa loại hoạt động này không?"
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
    ? 'Không thể tải danh sách loại hoạt động. Vui lòng thử lại sau.' 
    : null;

  return (
    <div>
      <Title level={2}>Quản lý loại hoạt động</Title>
      
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
                Thêm loại hoạt động
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
          name="loaiHoatDongForm"
        >
          <Form.Item
            name="ten"
            label="Tên loại hoạt động"
            rules={[
              { required: true, message: 'Vui lòng nhập tên loại hoạt động' },
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

export default LoaiHoatDongPage;