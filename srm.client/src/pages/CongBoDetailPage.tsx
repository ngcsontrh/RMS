import React from 'react';
import { Typography, Card, Descriptions, Button, Spin, Alert, message, Tag } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as CongBoService from '../services/CongBoService';
import { CongBoData } from '../models/CongBoData';
import { formatDate } from '../utils/dateTime';

const { Title } = Typography;

const CongBoDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch publication details
  const {
    data: congbo,
    isLoading,
    isError,
    error
  } = useQuery<CongBoData>({
    queryKey: ['congbo', id],
    queryFn: () => CongBoService.getById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Navigate back to list
  const handleBackToList = () => {
    navigate('/congbo');
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

  // Open external link
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" tip="Đang tải thông tin công bố..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <Alert
          message="Lỗi"
          description={`Không thể tải thông tin công bố: ${error instanceof Error ? error.message : 'Lỗi không xác định'}`}
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
          <Title level={2}>{congbo?.ten}</Title>
          <div>
            <Tag color="blue">{congbo?.tenNoiDangBao}</Tag>
            {congbo?.loaiQ && <Tag color="green">Q{congbo.loaiQ}</Tag>}
          </div>
        </div>
        
        {/* Publication Information Section */}
        <Card title="Thông tin công bố" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tạp chí/Hội nghị" span={2}>{congbo?.tenTapChi || '-'}</Descriptions.Item>
            <Descriptions.Item label="Nhà xuất bản">{congbo?.nhaXuatBan || '-'}</Descriptions.Item>
            <Descriptions.Item label="Địa điểm">{congbo?.diaDiem || '-'}</Descriptions.Item>
            <Descriptions.Item label="Ngày gửi đăng">
              {congbo?.ngayGuiDang ? formatDate(congbo.ngayGuiDang, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày công bố">
              {congbo?.ngayCongBo ? formatDate(congbo.ngayCongBo, 'DD/MM/YYYY') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Tập">{congbo?.tap || '-'}</Descriptions.Item>
            <Descriptions.Item label="Số">{congbo?.ky || '-'}</Descriptions.Item>
            <Descriptions.Item label="Trang">{congbo?.trang || '-'}</Descriptions.Item>
            <Descriptions.Item label="Chỉ số tác động">{congbo?.chiSoTacDong || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Authors Section */}
        <Card title="Thông tin tác giả" style={{ marginBottom: 20 }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Tác giả chính">{congbo?.tacGiaChinh || '-'}</Descriptions.Item>
            <Descriptions.Item label="Tác giả liên hệ">{congbo?.tacGiaLienHe || '-'}</Descriptions.Item>
            <Descriptions.Item label="Đồng tác giả">{congbo?.dongTacGias || '-'}</Descriptions.Item>
            <Descriptions.Item label="Phân chia đóng góp">{congbo?.phanChiaSuDongGop || '-'}</Descriptions.Item>
            <Descriptions.Item label="Hỗ trợ chi phí xuất bản">{congbo?.loaiHoTroChiPhi || '-'}</Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Publication Links and Documents Section */}
        <Card title="Liên kết và tài liệu">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Liên kết bài báo">
              {congbo?.linkBaiBao ? (
                <Button 
                  icon={<LinkOutlined />} 
                  onClick={() => openExternalLink(congbo.linkBaiBao!)}
                >
                  Mở bài báo
                </Button>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Minh chứng chỉ số tạp chí">
              {congbo?.linkMinhChungTapChi ? (
                <Button 
                  icon={<LinkOutlined />} 
                  onClick={() => openExternalLink(congbo.linkMinhChungTapChi!)}
                >
                  Mở minh chứng
                </Button>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Minh chứng chỉ số Q">
              {congbo?.linkMinhChungLoaiQ ? (
                <Button 
                  icon={<LinkOutlined />} 
                  onClick={() => openExternalLink(congbo.linkMinhChungLoaiQ!)}
                >
                  Mở minh chứng Q
                </Button>
              ) : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Tài liệu bài báo">
              {congbo?.fileMinhChungBaiBao ? (
                <Button 
                  icon={<DownloadOutlined />} 
                  onClick={() => handleDownload(congbo.fileMinhChungBaiBao!, 'Bai_Bao.pdf')}
                >
                  Tải xuống
                </Button>
              ) : '-'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Research Council Information */}
        {(congbo?.diemHoiDong || congbo?.tenHoiDong) && (
          <Card title="Đánh giá của hội đồng">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Hội đồng nghiên cứu">{congbo?.tenHoiDong || '-'}</Descriptions.Item>
              <Descriptions.Item label="Điểm hội đồng">{congbo?.diemHoiDong || '-'}</Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default CongBoDetailPage;