import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Typography,
  message,
  Card,
  Spin,
  Tooltip,
  Row,
  Col,
  Alert,
  Select,
  DatePicker
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  ReloadOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { UserData } from '../../models/UserData';
import * as UserService from '../../services/UserService';
import * as DonViService from '../../services/DonViService';
import * as RoleService from '../../services/RoleService';
import dayjs, { formatDate } from '../../utils/dateTime';
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';
import { DonViData } from '../../models/DonViData';
import { RoleData } from '../../models/RoleData';

const { Title } = Typography;
const { Option } = Select;

const UserPage: React.FC = () => {
  const queryClient = useQueryClient();
  
  // State for modals and form
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('Thêm người dùng');
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [viewingUser, setViewingUser] = useState<UserData | null>(null);
  const [form] = Form.useForm();
  
  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Query for fetching users data
  const { 
    data, 
    isLoading, 
    isError, 
    error: queryError 
  } = useQuery({
    queryKey: ['users', pagination.current, pagination.pageSize],
    queryFn: async () => {
      const response = await UserService.getPage(
        pagination.current, 
        pagination.pageSize
      );      
      
      return response;
    }
  });

  // Query for fetching don vi list
  const { 
    data: donViList 
  } = useQuery({
    queryKey: ['donvis-basic'],
    queryFn: async () => {
      return await DonViService.list();
    }
  });

  // Query for fetching role list
  const { 
    data: roleList 
  } = useQuery({
    queryKey: ['roles-basic'],
    queryFn: async () => {
      return await RoleService.list();
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

  // Mutation for creating new user
  const createMutation = useMutation({
    mutationFn: UserService.create,
    onSuccess: () => {
      message.success('Người dùng đã được thêm thành công');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi thêm người dùng:', error);
      message.error('Không thể thêm người dùng');
    }
  });

  // Mutation for updating user
  const updateMutation = useMutation({
    mutationFn: UserService.update,
    onSuccess: () => {
      message.success('Người dùng đã được cập nhật thành công');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setModalVisible(false);
      form.resetFields();
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật người dùng:', error);
      message.error('Không thể cập nhật người dùng');
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
    setEditingUser(null);
    setModalTitle('Thêm người dùng');
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit button click
  const handleEditClick = (record: UserData) => {
    setEditingUser(record);
    setModalTitle('Chỉnh sửa người dùng');
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      hoTen: record.hoTen,
      soDienThoai: record.soDienThoai,
      maVienChuc: record.maVienChuc,
      gioiTinh: record.gioiTinh,
      donViId: record.donViId,
      ngaySinh: record.ngaySinh ? dayjs(record.ngaySinh) : undefined,
      danToc: record.danToc,
      chucDanh: record.chucDanh,
      chuyenNganh: record.chuyenNganh,
      hocVi: record.hocVi,
      truongDH: record.truongDH,
      role: record.role
    });
    setModalVisible(true);
  };

  // Handle view details
  const handleViewDetails = async (id: string) => {
    try {
      const userDetail = await UserService.getById(id);
      setViewingUser(userDetail);
      setViewModalVisible(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chi tiết người dùng:', error);
      message.error('Không thể lấy thông tin chi tiết người dùng');
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingUser) {
        // Update existing record
        updateMutation.mutate({
          ...editingUser,
          ...values
        });
      } else {
        // Create new record
        createMutation.mutate(values);
      }
    } catch (error) {
      console.error('Lỗi xác thực biểu mẫu:', error);
    }
  };

  // Refresh data
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
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
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
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
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: unknown, record: UserData) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="default" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record.id!)} 
              size="small"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={() => handleEditClick(record)} 
              size="small"
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const errorMessage = queryError 
    ? 'Không thể tải danh sách người dùng. Vui lòng thử lại sau.' 
    : null;

  return (
    <div>
      <Title level={2}>Quản lý Người dùng</Title>
      
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
                Thêm người dùng
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
            scroll={{ x: 'max-content' }}
          />
        </Spin>
      </Card>

      {/* Modal for Add/Edit */}
      <Modal
        title={modalTitle}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={700}
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
          name="userForm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên đăng nhập' },
                  { max: 50, message: 'Tên đăng nhập không được vượt quá 50 ký tự' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hoTen"
                label="Họ tên"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ tên' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="soDienThoai"
                label="Số điện thoại"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="maVienChuc"
                label="Mã viên chức"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gioiTinh"
                label="Giới tính"
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="donViId"
                label="Đơn vị"
                rules={[
                  { required: true, message: 'Vui lòng chọn đơn vị' }
                ]}
              >
                <Select placeholder="Chọn đơn vị">
                  {donViList?.map((donVi: DonViData) => (
                    <Option key={donVi.id} value={donVi.id}>
                      {donVi.ten}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ngaySinh"
                label="Ngày sinh"
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="danToc"
                label="Dân tộc"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="chucDanh"
                label="Chức danh"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="chuyenNganh"
                label="Chuyên ngành"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hocVi"
                label="Học vị"
              >
                <Select placeholder="Chọn học vị">
                  <Option value="Cử nhân">Cử nhân</Option>
                  <Option value="Thạc sĩ">Thạc sĩ</Option>
                  <Option value="Tiến sĩ">Tiến sĩ</Option>
                  <Option value="Phó Giáo sư">Phó Giáo sư</Option>
                  <Option value="Giáo sư">Giáo sư</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="truongDH"
                label="Trường đại học"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Vai trò"
                rules={[
                  { required: true, message: 'Vui lòng chọn vai trò' }
                ]}
              >
                <Select placeholder="Chọn vai trò">
                  {roleList?.map((role: RoleData) => (
                    <Option key={role.id} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal for View Details */}
      <Modal
        title="Chi tiết người dùng"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setViewModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {viewingUser && (
          <div>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Tên đăng nhập:</strong> {viewingUser.username}
              </Col>
              <Col span={12}>
                <strong>Email:</strong> {viewingUser.email}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Họ tên:</strong> {viewingUser.hoTen}
              </Col>
              <Col span={12}>
                <strong>Số điện thoại:</strong> {viewingUser.soDienThoai}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Mã viên chức:</strong> {viewingUser.maVienChuc}
              </Col>
              <Col span={12}>
                <strong>Giới tính:</strong> {viewingUser.gioiTinh}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Đơn vị:</strong> {viewingUser.tenDonVi}
              </Col>
              <Col span={12}>
                <strong>Ngày sinh:</strong> {viewingUser.ngaySinh ? formatDate(viewingUser.ngaySinh, 'DD/MM/YYYY') : 'N/A'}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Dân tộc:</strong> {viewingUser.danToc}
              </Col>
              <Col span={12}>
                <strong>Chức danh:</strong> {viewingUser.chucDanh}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Chuyên ngành:</strong> {viewingUser.chuyenNganh}
              </Col>
              <Col span={12}>
                <strong>Học vị:</strong> {viewingUser.hocVi}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Trường đại học:</strong> {viewingUser.truongDH}
              </Col>
              <Col span={12}>
                <strong>Vai trò:</strong> {viewingUser.role}
              </Col>
            </Row>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Ngày tạo:</strong> {viewingUser.ngayTao ? formatDate(viewingUser.ngayTao, 'DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
              <Col span={12}>
                <strong>Cập nhật gần nhất:</strong> {viewingUser.ngaySua ? formatDate(viewingUser.ngaySua, 'DD/MM/YYYY HH:mm') : 'N/A'}
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserPage;