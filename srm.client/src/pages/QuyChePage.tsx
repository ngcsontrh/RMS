import React, { useState } from 'react';
import { Typography, Card, Divider, Button, Row, Tabs } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const QuyChePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');

  const Decision231Content = () => (
    <Card className="regulation-card">
      <Title level={3}>Quyết định số 231/QĐ-ĐHTL ngày 18/3/2021</Title>
      <Title level={4}>
        Về việc tổ chức thực hiện đề tài NCKH trọng điểm Trường Đại học Thủy lợi
      </Title>

      <Paragraph>
        Quy định này quy định việc tổ chức thực hiện đề tài nghiên cứu khoa học
        trọng điểm Trường Đại học Thủy lợi.
      </Paragraph>

      <Divider orientation="left">Thời gian thực hiện</Divider>
      <Paragraph>
        <Text strong>Tối đa không quá 18 tháng</Text> đồng thời đã thực hiện
        được ít nhất 6 tháng kể từ khi ký hợp đồng.
      </Paragraph>

      <Divider orientation="left">Kết quả bắt buộc</Divider>
      <Paragraph>
        Đề tài phải công bố ít nhất:
        <ul>
          <li>
            01 bài báo trên tạp chí khoa học chuyên ngành quốc tế có uy tín
            thuộc danh mục ISI bao gồm SCIE và SSCI (theo danh mục được Bộ Khoa
            học và Công nghệ công bố hoặc được Hội đồng Khoa học công nghệ của
            Trường Đại học Thủy lợi công nhận)
          </li>
          <li>
            01 bài báo trong số tiếng anh của Tạp chí Khoa học kỹ thuật Thủy lợi
            và Môi trường
          </li>
        </ul>
      </Paragraph>

      <Paragraph>
        <Text strong>Yêu cầu đối với bài báo quốc tế:</Text> Chủ nhiệm đề tài
        bắt buộc phải là Corresponding author, tác giả thứ nhất bắt buộc là CBVC
        của Trường hoặc các đơn vị có tư cách pháp nhân trực thuộc Trường.
      </Paragraph>

      <Paragraph>
        <Text strong>
          Yêu cầu đối với bài báo trong Tạp chí KHKT Thủy lợi và Môi trường:
        </Text>{" "}
        Tác giả bài báo là một trong các thành viên của nhóm thực hiện đề tài.
      </Paragraph>

      <Divider orientation="left">Kinh phí đề tài</Divider>
      <Paragraph>
        <Text strong>Tối đa 120 triệu đồng</Text> (kinh phí theo từng mức tương
        ứng với kết quả của bài báo công bố quốc tế)
      </Paragraph>

      <Row justify="end">
        
          <a
            href="https://khcn.tlu.edu.vn/Home/DownloadFileNews/10?FileName=Q%C4%90231.pdf"
            download="QD231.pdf"
          >
            <Button type="primary" icon={<DownloadOutlined />}>
              Tải xuống Quyết định            
            </Button>
          </a>
      </Row>
    </Card>
  );

  const Decision288Content = () => (
    <Card className="regulation-card">
      <Title level={3}>Quyết định số 288/QĐ-ĐHTL ngày 14/4/2020</Title>
      <Title level={4}>Về việc ban hành quy chế thành lập và tổ chức hoạt động của nhóm nghiên cứu mạnh</Title>
      
      <Paragraph>
        Quy chế này quy định tiêu chí, thủ tục, chế độ ưu đãi cho các nhóm nghiên cứu với mục tiêu hướng tới các sản phẩm đầu ra rõ ràng về:
        <ul>
          <li>Số lượng bài báo quốc tế uy tín</li>
          <li>Số lượng bằng độc quyền sáng chế</li>
          <li>Số lượng bằng độc quyền giải pháp hữu ích</li>
        </ul>
      </Paragraph>
      
      <Row justify="end">
        <a href='https://khcn.tlu.edu.vn/Home/DownloadFileNews/7?FileName=Quy%20che%20NCM.pdf' download='QD288.pdf'>
          <Button type="primary" icon={<DownloadOutlined />}>
            Tải xuống Quy chế
          </Button>
        </a>
      </Row>
    </Card>
  );

  const Decision255Content = () => (
    <Card className="regulation-card">
      <Title level={3}>Quyết định số 255/QĐ-ĐHTL ngày 30/3/2021</Title>
      <Title level={4}>
        Về việc ban hành quy định về hỗ trợ kinh phí tham dự hội nghị, hội thảo,
        công bố quốc tế và sở hữu trí tuệ cho cán bộ viên chức và người lao động
        của Trường Đại học Thủy lợi
      </Title>

      <Paragraph>
        Quy định này quy định về hỗ trợ kinh phí cho CBGV thuộc biên chế của
        Trường Đại học Thuỷ lợi tham dự hội nghị, hội thảo trong nước và quốc tế
        hoặc có các bài báo khoa học đã được công bố quốc tế, văn bằng sở hữu
        trí tuệ trong năm.
      </Paragraph>

      <Row justify="end">
        <a
          href="https://drive.google.com/file/d/1Jv1FggLHUeM4pbT1Eu_QxoMSF6tUzeam/view?usp=sharing"
          download="QD255.pdf"
        >
          <Button type="primary" icon={<DownloadOutlined />}>
            Tải xuống Quyết định
          </Button>
        </a>
      </Row>
    </Card>
  );

  return (
    <div className="page-container">
      <Typography>
        <Title level={1}>Quy chế và Quyết định</Title>
        
        <Paragraph>
          Các quy chế và quy định về hoạt động nghiên cứu khoa học tại Trường Đại học Thủy lợi
        </Paragraph>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          type="card"
          size="large"
          tabPosition="top"
          className="regulation-tabs"
        >
          <TabPane tab="QĐ 231/QĐ-ĐHTL" key="1">
            <Decision231Content />
          </TabPane>
          <TabPane tab="QĐ 288/QĐ-ĐHTL" key="2">
            <Decision288Content />
          </TabPane>
          <TabPane tab="QĐ 255/QĐ-ĐHTL" key="3">
            <Decision255Content />
          </TabPane>
        </Tabs>
      </Typography>
    </div>
  );
};

export default QuyChePage;