import React from 'react';
import { Typography, Card, Descriptions, Button, Spin, Alert, message, Tag } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as DeTaiService from '../services/DeTaiService';
import { DeTaiData } from '../models/DeTaiData';
import { formatDate } from '../utils/dateTime';

const { Title } = Typography;

const DeTaiDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch project details
  const {
    data: detai,
    isLoading,
    isError,
    error
  } = useQuery<DeTaiData>({
    queryKey: ['detai', id],
    queryFn: () => DeTaiService.getById(id!),
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
    navigate('/detai');
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
      
      message.success(`Downloading ${documentName}`);
    } catch (error) {
      message.error(`Failed to download document: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải thông tin đề tài..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <Alert
          message="Lỗi"
          description={`Không thể tải thông tin đề tài: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`}
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
          <Title level={2}>{detai?.ten}</Title>
          <div>
            <Tag color="blue">{detai?.tenCapDeTai}</Tag>
            <Tag color="green">Mã số: {detai?.maSo}</Tag>
          </div>
        </div>
        
        {/* Main Information Section */}
        <Card title="Thông tin đề tài" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Mục tiêu đề tài">{detai?.mucTieu || '-'}</Descriptions.Item>
            <Descriptions.Item label="Nội dung đề tài">{detai?.noiDung || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Timeline and Budget Section */}
        <Card title="Thời gian và kinh phí" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Ngày bắt đầu">
              {detai?.ngayBatDau ? formatDate(detai.ngayBatDau, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">
              {detai?.ngayKetThuc ? formatDate(detai.ngayKetThuc, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng kinh phí">{formatMoney(detai?.tongKinhPhi)}</Descriptions.Item>
            <Descriptions.Item label="Kinh phí hàng năm">{formatMoney(detai?.kinhPhiHangNam)}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Project Team Section */}
        <Card title="Nhóm nghiên cứu" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Đơn vị chủ trì">{detai?.chuNhiem || '-' }</Descriptions.Item>
            <Descriptions.Item label="Chủ nhiệm đề tài">{detai?.chuNhiem || '-'}</Descriptions.Item>
            <Descriptions.Item label="Thành viên tham gia">
              {detai?.canBoThamGias?.length ? (
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {detai.canBoThamGias.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Phân chia đóng góp">{detai?.phanChiaSuDongGop || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Project Documents Section */}
        {(detai?.hoSoNghiemThu || detai?.hoSoSanPham) && (
          <Card title="Tài liệu đề tài">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Hồ sơ nghiệm thu">
                {detai?.hoSoNghiemThu ? (
                  <Button 
                    icon={<DownloadOutlined />} 
                    onClick={() => handleDownload(detai.hoSoNghiemThu!, 'Acceptance_Documents.pdf')}
                  >
                    Tải xuống
                  </Button>
                ) : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Hồ sơ sản phẩm">
                {detai?.hoSoSanPham ? (
                  <Button 
                    icon={<DownloadOutlined />} 
                    onClick={() => handleDownload(detai.hoSoSanPham!, 'Product_Documents.pdf')}
                  >
                    Tải xuống
                  </Button>
                ) : '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default DeTaiDetailPage;