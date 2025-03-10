import React from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AppRoutes } from './routes';

const { Header, Content, Footer, Sider } = Layout;

// Kích hoạt plugin UTC và timezone
dayjs.extend(utc);
dayjs.extend(timezone);

// Đặt múi giờ mặc định là UTC
dayjs.tz.setDefault("UTC");

// Menu items cho Sider
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
    (icon, index) => ({
        key: String(index + 1),
        icon: React.createElement(icon),
        label: `nav ${index + 1}`,
    })
);

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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