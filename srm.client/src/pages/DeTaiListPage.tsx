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
import { DeTaiData } from '../models/DeTaiData';
import * as DeTaiService from '../services/DeTaiService';
import { formatDate } from '../utils/dateTime';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PageData } from '../models/PageData';

const { Title } = Typography;
const { Search } = Input;

const DeTaiListPage: React.FC = () => {
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
  } = useQuery<PageData<DeTaiData>>({
    queryKey: ['detais', pagination.current, pagination.pageSize, debouncedSearchTerm],
    queryFn: () => DeTaiService.getPage(
      pagination.current as number,
      pagination.pageSize as number,
      debouncedSearchTerm
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

  // Format money values
  const formatMoney = (amount: number | undefined) => {
    if (amount === undefined) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

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
    queryClient.invalidateQueries({ queryKey: ['detais'] });
  };

  // Prefetch detail page data when hovering on view button
  const prefetchDetail = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['detai', id],
      queryFn: () => DeTaiService.getById(id)
    });
  };

  // Navigate to create new
  const handleAddClick = () => {
    navigate('/detai/create');
  };

  // Navigate to view details
  const handleViewDetails = (id: string) => {
    navigate(`/detai/${id}`);
  };

  // Navigate to edit
  const handleEdit = (id: string) => {
    navigate(`/detai/${id}/edit`);
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
      title: 'Cấp đề tài',
      dataIndex: 'tenCapDeTai',
      key: 'tenCapDeTai',
      render: (text: string) => <Tag color="blue">{text}</Tag>
    },
    {
      title: 'Tên đề tài',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Mã số',
      dataIndex: 'maSo',
      key: 'maSo',
    },
    {
      title: 'Đơn vị chủ trì',
      dataIndex: 'tenDonViChuTri',
      key: 'tenDonViChuTri',
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'chuNhiem',
      key: 'chuNhiem',
    },
    {
      title: 'Thời gian',
      key: 'period',
      render: (record: DeTaiData) => {
        const start = record.ngayBatDau ? formatDate(record.ngayBatDau, 'DD/MM/YYYY') : '';
        const end = record.ngayKetThuc ? formatDate(record.ngayKetThuc, 'DD/MM/YYYY') : '';
        return `${start} - ${end}`;
      }
    },
    {
      title: 'Kinh phí',
      dataIndex: 'tongKinhPhi',
      key: 'tongKinhPhi',
      render: (amount: number) => formatMoney(amount)
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: unknown, record: DeTaiData) => (
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
      <Title level={2}>Đề tài nghiên cứu</Title>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Tìm kiếm theo tên hoặc mã số"
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
                  Thêm đề tài mới
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {isError && (
          <div style={{ marginBottom: 16 }}>
            <Alert 
              message="Không thể tải danh sách đề tài" 
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

export default DeTaiListPage;