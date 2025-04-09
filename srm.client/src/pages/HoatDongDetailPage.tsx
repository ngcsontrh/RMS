import React from 'react';
import { Typography, Card, Descriptions, Button, Spin, Alert, message, Tag } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as HoatDongService from '../services/HoatDongService';
import { HoatDongData } from '../models/HoatDongData';
import { formatDate } from '../utils/dateTime';

const { Title } = Typography;

const HoatDongDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch activity details
  const {
    data: hoatdong,
    isLoading,
    isError,
    error
  } = useQuery<HoatDongData>({
    queryKey: ['hoatdong', id],
    queryFn: () => HoatDongService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Format money values
  const formatMoney = (amount: number | undefined) => {
    if (amount === undefined) return '-';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Navigate back to list
  const handleBackToList = () => {
    navigate('/hoatdong');
  };

  // Handle document download
  const handleDownload = (documentUrl: string, documentName: string) => {
    try {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success(`Đang tải xuống ${documentName}`);
    } catch (error) {
      message.error(`Không thể tải tài liệu: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải thông tin hoạt động..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <Alert
          message="Lỗi"
          description={`Không thể tải thông tin hoạt động: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`}
          type="error"
          showIcon
        />
        <div style={{ marginTop: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBackToList}>
            Quay lại danh sách
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBackToList} style={{ marginBottom: 16 }}>
          Quay lại danh sách
        </Button>
        
        {/* Header Section */}
        <div style={{ marginBottom: 20 }}>
          <Title level={2}>{hoatdong?.ten}</Title>
          <div>
            <Tag color="blue">{hoatdong?.tenLoaiHoatDong}</Tag>
            {hoatdong?.diaChi && <Tag color="green">Địa điểm: {hoatdong.diaChi}</Tag>}
          </div>
        </div>
        
        {/* Main Information Section */}
        <Card title="Thông tin hoạt động" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Nội dung hoạt động">{hoatdong?.noiDung || '-'}</Descriptions.Item>
            <Descriptions.Item label="Ghi chú">{hoatdong?.ghiChu || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Timeline and Budget Section */}
        <Card title="Thời gian và kinh phí" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Ngày bắt đầu">
              {hoatdong?.ngayBatDau ? formatDate(hoatdong.ngayBatDau, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">
              {hoatdong?.ngayKetThuc ? formatDate(hoatdong.ngayKetThuc, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Kinh phí">{formatMoney(hoatdong?.kinhPhi)}</Descriptions.Item>
            <Descriptions.Item label="Số trang">{hoatdong?.soTrang || '-'}</Descriptions.Item>
            <Descriptions.Item label="Số tiết">{hoatdong?.soTiet || '-'}</Descriptions.Item>
            <Descriptions.Item label="Đường dẫn">
              {hoatdong?.duongDan ? (
                <a href={hoatdong.duongDan} target="_blank" rel="noopener noreferrer">
                  {hoatdong.duongDan}
                </a>
              ) : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Project Team Section */}
        <Card title="Nhóm tham gia" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Chủ nhiệm">{hoatdong?.chuNhiem || '-'}</Descriptions.Item>
            <Descriptions.Item label="Thành viên tham gia">
              {hoatdong?.thanhVienThamGias ? (
                <div>{hoatdong.thanhVienThamGias}</div>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Phân chia đóng góp">{hoatdong?.phanChiaSuDongGop || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Documents Section */}
        {hoatdong?.fileDinhKem && (
          <Card title="Tài liệu đính kèm">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="File đính kèm">
                <Button 
                  icon={<DownloadOutlined />} 
                  onClick={() => handleDownload(hoatdong.fileDinhKem!, 'HoatDong_Attachment.pdf')}
                >
                  Tải xuống
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default HoatDongDetailPage;