import React from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AppRoutes } from './routes';
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// Kích hoạt plugin UTC và timezone
dayjs.extend(utc);
dayjs.extend(timezone);

// Đặt múi giờ mặc định là UTC
dayjs.tz.setDefault("UTC");

type MenuItem = Required<MenuProps>['items'][number];


const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            key: '1',
            label: 'Trang chủ',
            onClick: () => navigate('/')
        },
        {
            key: '2',
            label: 'Dữ liệu toàn trường',
            children: [
                {
                    key: '2.1',
                    label: 'Đề tài',
                    onClick: () => navigate('/toan-truong/de-tai')
                },
                {
                    key: '2.2',
                    label: 'Công bố',
                    onClick: () => navigate('/toan-truong/cong-bo')
                },
                {
                    key: '2.3',
                    label: 'Đề tài',
                    onClick: () => navigate('/toan-truong/hoat-dong')
                }
            ],
        },
        {
            key: '3',
            label: 'Dữ liệu cá nhân',
            children: [
                {
                    key: '3.1',
                    label: 'Đề tài',
                    onClick: () => navigate('/ca-nhan/de-tai')
                },
                {
                    key: '3.2',
                    label: 'Công bố',
                    onClick: () => navigate('/ca-nhan/cong-bo')
                },
                {
                    key: '3.3',
                    label: 'Đề tài',
                    onClick: () => navigate('/ca-nhan/hoat-dong')
                }
            ],
        },
        {
            key: '4',
            label: 'Danh mục',
            onClick: () => navigate('/danh-muc')
        },
        {
            key: '5',
            label: 'Thông tin cá nhân',
            onClick: () => navigate('/thong-tin-ca-nhan')
        },
        {
            key: '6',
            label: 'Hướng dẫn sử dụng',
            onClick: () => navigate('/huong-dan-su-dung')
        },
        {
            key: '7',
            label: 'Lý lịch khoa học',
            onClick: () => navigate('/ly-lich-khoa-hoc')
        },
        {
            key: '8',
            label: 'Kết quả',
            onClick: () => navigate('/ket-qua')
        },
        {
            key: '9',
            label: 'Quy định tính',
            onClick: () => navigate('/quy-dinh-tinh')
        },
        {
            key: '10',
            label: 'Đề xuất đề tài',
            onClick: () => navigate('/de-xuat-de-tai')
        },
        {
            key: '11',
            label: 'Quy chế - Quy định KHCN',
            onClick: () => navigate('/quy-che')
        },
        {
            key: '12',
            label: 'Liên hệ',
            onClick: () => navigate('/lien-he')
        },
        {
            key: '13',
            label: 'Đơn vị chủ trì',
            onClick: () => navigate('/don-vi-chu-tri')
        },
        {
            key: '14',
            label: 'Nơi đăng báo',
            onClick: () => navigate('/noi-dang-bao')
        },
        {
            key: '15',
            label: 'Thành quả',
            onClick: () => navigate('/thanh-qua')
        }
    ];

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"                
            >
                <div style={{
                    height: 32,
                    margin: 16,
                    background: "rgba(255, 255, 255, .2)",
                    borderRadius: 6
                } } />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={items} />
            </Sider>
            <Layout style={{ minHeight: "100vh" }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "15px 10px 0" }}>
                    <div
                        style={{
                            padding: 12,                            
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <AppRoutes />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;