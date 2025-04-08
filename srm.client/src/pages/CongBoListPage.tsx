import React, { useState, useCallback, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Card,
  Spin,
  Row,
  Col,
  Input,
  Alert,
  Tag,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons';
import { CongBoData } from '../models/CongBoData';
import * as CongBoService from '../services/CongBoService';
import dayjs, { formatDate } from '../utils/dateTime';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PageData } from '../models/PageData';

const { Title } = Typography;
const { Search } = Input;

const CongBoListPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchText, setSearchText] = useState<string>('');

  // Custom debounce hook
  const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };
  
  const debouncedSearchTerm = useDebounce(searchText, 500);

  // Fetch data with React Query
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery<PageData<CongBoData>>({
    queryKey: ['congbos', pagination.current, pagination.pageSize, debouncedSearchTerm],
    queryFn: () => CongBoService.getPage(
      pagination.current as number,
      pagination.pageSize as number
    ),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    placeholderData: (previousData) => previousData // Keep previous data while fetching new data
  });

  // Update pagination total when data changes
  useEffect(() => {
    if (data) {
      setPagination(prev => ({
        ...prev,
        total: data.total
      }));
    }
  }, [data]);

  // Handle table change (pagination, filters)
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination(prev => ({
      ...prev,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10
    }));
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      setPagination(prev => ({
        ...prev,
        current: 1 // Reset to first page when searching
      }));
    },
    []
  );

  // Search functionality
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  // Refresh data
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['congbos'] });
  };

  // Prefetch detail page data when hovering on view button
  const prefetchDetail = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['congbo', id],
      queryFn: () => CongBoService.getById(id)
    });
  };

  // Navigate to create new
  const handleAddClick = () => {
    navigate('/congbo/create');
  };

  // Navigate to view details
  const handleViewDetails = (id: string) => {
    navigate(`/congbo/${id}`);
  };

  // Navigate to edit
  const handleEdit = (id: string) => {
    navigate(`/congbo/${id}/edit`);
  };

  // Table columns configuration
  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_: unknown, __: unknown, index: number) => (pagination.current! - 1) * pagination.pageSize! + index + 1,
    },
    {
      title: 'Tên công bố',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Tạp chí/Hội nghị',
      dataIndex: 'tenTapChi',
      key: 'tenTapChi',
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'nhaXuatBan',
      key: 'nhaXuatBan',
    },
    {
      title: 'Nơi đăng bài',
      dataIndex: 'tenNoiDangBao',
      key: 'tenNoiDangBao',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Ngày công bố',
      dataIndex: 'ngayCongBo',
      key: 'ngayCongBo',
      render: (date: dayjs.Dayjs) => date ? formatDate(date, 'DD/MM/YYYY') : ''
    },
    {
      title: 'Chỉ số tác động',
      dataIndex: 'chiSoTacDong',
      key: 'chiSoTacDong',
    },
    {
      title: 'Tác giả chính',
      dataIndex: 'tacGiaChinh',
      key: 'tacGiaChinh',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: unknown, record: CongBoData) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button 
              type="primary" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewDetails(record.id!)} 
              size="small"
              onMouseEnter={() => prefetchDetail(record.id!)}
            />
          </Tooltip>
          {isAuthenticated && (
            <Tooltip title="Chỉnh sửa">
              <Button 
                type="default" 
                icon={<EditOutlined />} 
                onClick={() => handleEdit(record.id!)} 
                size="small"
              />
            </Tooltip>
          )}
        </Space>
      )
    },
  ];

  return (
    <div>
      <Title level={2}>Công bố khoa học</Title>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Tìm kiếm theo tên hoặc tạp chí"
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
                loading={isLoading || isFetching}
              >
                Làm mới
              </Button>
              {isAuthenticated && (
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddClick}
                >
                  Thêm công bố
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {isError && (
          <div style={{ marginBottom: 16 }}>
            <Alert 
              message="Không thể tải danh sách công bố" 
              description={error instanceof Error ? error.message : 'Lỗi không xác định'}
              type="error" 
              showIcon 
            />
          </div>
        )}

        <Spin spinning={isLoading || isFetching}>
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
    </div>
  );
};

export default CongBoListPage;