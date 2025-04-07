import React, { useState } from 'react';
import { Card, Typography, List, Button, Divider, Pagination, Space } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// All regulations data from both pages
const allRegulationsData = [
  // Page 1 data
  {
    id: 1,
    title: 'Quyết định số 231/QĐ-ĐHTL ngày 18/3/2021 về việc tổ chức thực hiện đề tài NCKH trọng điểm Trường Đại học Thủy lợi',
    description: 'Quy định này quy định việc tổ chức thực hiện đề tài nghiên cứu khoa học trọng điểm Trường Đại học Thủy lợi.',
    details: [
      { 
        label: '1. Thời gian thực hiện:', 
        content: 'Tối đa không quá 18 tháng đồng thời đã thực hiện được ít nhất 6 tháng kể từ khi ký hợp đồng' 
      },
      { 
        label: '2. Kết quả bắt buộc:', 
        content: 'Đề tài phải công bố ít nhất 01 bài báo trên tạp chí khoa học chuyên ngành quốc tế có uy tín thuộc danh mục ISI bao gồm SCIE và SSCI (theo danh mục được Bộ Khoa học và Công nghệ công bố hoặc được Hội đồng Khoa học công nghệ của Trường Đại học Thủy lợi công nhận) và 01 bài báo trong số tiếng anh của Tạp chí Khoa học kỹ thuật Thủy lợi và Môi trường. Đối với bài báo trên tạp chí khoa học chuyên ngành quốc tế có uy tín, chủ nhiệm đề tài bắt buộc phải là Corresponding author, tác giả thứ nhất bắt buộc là CBVC của Trường Đại học Thủy lợi.' 
      },
      { 
        label: '3. Kinh phí đề tài:', 
        content: 'Tối đa 120 triệu (kinh phí theo từng mức tương ứng với kết quả của bài báo công bố quốc tế)' 
      }
    ],
    downloadText: 'Nội dung Quyết định download dưới đây',
    file: 'QD231.pdf'
  },
  
  // Page 2 data
  {
    id: 2,
    title: 'Quyết định số 255/QĐ-ĐHTL ngày 30/3/2021 về việc ban hành quy định về hỗ trợ kinh phí tham dự hội nghị, hội thảo, công bố quốc tế và sở hữu trí tuệ cho cán bộ viên chức và người lao động của Trường Đại học Thủy lợi',
    description: 'Quy định này quy định về hỗ trợ kinh phí cho CBGV thuộc biên chế của Trường Đại học Thuỷ lợi tham dự hội nghị, hội thảo trong nước và quốc tế hoặc có các bài báo khoa học đã được công bố quốc tế, văn bằng sở hữu trí tuệ trong năm.',
    details: [
      {
        label: 'Nội dung Quyết định download tại link:',
        content: 'https://drive.google.com/file/d/1Jv1FggLHUeM4pbT1Eu_QxoMSF6tUzeam/view?usp=sharing'
      }
    ],
    file: '255-QD-DHTL.pdf'
  },
  {
    id: 3,
    title: 'Quyết định số 288/QĐ-ĐHTL ngày 14/4/2020 về việc ban hành quy chế thành lập và tổ chức hoạt động của nhóm nghiên cứu mạnh',
    description: 'Quy chế này quy định tiêu chí, thủ tục, chế độ ưu đãi cho các nhóm nghiên cứu với mục tiêu hướng tới các sản phẩm đầu ra rõ ràng về số lượng bài báo quốc tế uy tín, số lượng bằng độc quyền sáng chế và số lượng bằng độc quyền giải pháp hữu ích.',
    details: [
      {
        label: 'Nội dung Quy chế download:',
        content: 'Tại đây'
      }
    ],
    file: 'Quy che NCM.pdf'
  }
];

// Get regulations for the current page
const getPageRegulations = (page, pageSize = 1) => {
  const startIndex = (page - 1) * pageSize;
  return allRegulationsData.slice(startIndex, startIndex + pageSize);
};

const Regulations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1; // Show 1 regulation per page, just like the reference site
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentRegulations = getPageRegulations(currentPage, pageSize);
  
  return (
    <Card>
      <Title level={2}>Quy Chế - Quy định KHCN</Title>
      <Paragraph>Thông tin về các quy chế, quy định về nghiên cứu khoa học của Trường</Paragraph>
      
      {/* Container with fixed height to prevent layout shift */}
      <div style={{ minHeight: '420px' }}>
        <List
          itemLayout="vertical"
          dataSource={currentRegulations}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />} 
                  key={`download-${item.id}`}
                >
                  Tải tệp tin
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<FileTextOutlined style={{ fontSize: 24 }} />}
                title={<Text strong>{item.title}</Text>}
                description={item.description}
              />
              
              <div style={{ marginTop: 16 }}>
                {item.details.map((detail, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <Text strong>{detail.label}</Text>
                    <Paragraph style={{ marginLeft: 24 }}>{detail.content}</Paragraph>
                  </div>
                ))}
              </div>
              
              {item.downloadText && (
                <Paragraph style={{ marginTop: 16, fontWeight: 'bold' }}>
                  {item.downloadText}
                </Paragraph>
              )}
              
              <Divider />
            </List.Item>
          )}
        />
      </div>
      
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Pagination 
          current={currentPage} 
          onChange={handlePageChange} 
          total={allRegulationsData.length} 
          pageSize={pageSize}
          showSizeChanger={false}
        />
      </div>
    </Card>
  );
};

export default Regulations;