import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Card,
  Spin,
  Row,
  Col,
  Alert,
  Tooltip
} from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons';
import { HoatDongData } from '../models/HoatDongData';
import * as HoatDongService from '../services/HoatDongService';
import { formatDate } from '../utils/dateTime';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { PageData } from '../models/PageData';

const { Title } = Typography;

const HoatDongListPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // Fetch data with React Query
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery<PageData<HoatDongData>>({
    queryKey: ['hoatdongs', pagination.current, pagination.pageSize],
    queryFn: () => HoatDongService.getPage(
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

  // Refresh data
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['hoatdongs'] });
  };

  // Prefetch detail page data when hovering on view button
  const prefetchDetail = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['hoatdong', id],
      queryFn: () => HoatDongService.getById(id)
    });
  };

  // Navigate to create new
  const handleAddClick = () => {
    navigate('/hoatdong/create');
  };

  // Navigate to view details
  const handleViewDetails = (id: string) => {
    navigate(`/hoatdong/${id}`);
  };

  // Navigate to edit
  const handleEdit = (id: string) => {
    navigate(`/hoatdong/${id}/edit`);
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
      title: 'Tên hoạt động',
      dataIndex: 'ten',
      key: 'ten',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Địa điểm',
      dataIndex: 'diaChi',
      key: 'diaChi',
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'chuNhiem',
      key: 'chuNhiem',
    },
    {
      title: 'Thời gian',
      key: 'period',
      render: (record: HoatDongData) => {
        const start = record.ngayBatDau ? formatDate(record.ngayBatDau, 'DD/MM/YYYY') : '';
        const end = record.ngayKetThuc ? formatDate(record.ngayKetThuc, 'DD/MM/YYYY') : '';
        return `${start} - ${end}`;
      }
    },
    {
      title: 'Kinh phí',
      dataIndex: 'kinhPhi',
      key: 'kinhPhi',
      render: (amount: number) => formatMoney(amount)
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: unknown, record: HoatDongData) => (
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
      <Title level={2}>Hoạt động nghiên cứu</Title>

      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={24} md={24} lg={24} style={{ textAlign: 'right' }}>
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
                  Thêm hoạt động mới
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        {isError && (
          <div style={{ marginBottom: 16 }}>
            <Alert 
              message="Không thể tải danh sách hoạt động" 
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

export default HoatDongListPage;