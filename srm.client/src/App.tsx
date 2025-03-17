import React, { useEffect } from 'react';
import { Layout, Flex, theme, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppRoutes } from './routes';
import { configureApiInterceptors } from './services/api';
import { Sidebar } from './components/shared/Sidebar';
import { useAuthStore } from './stores/authStore';

const { Header, Content, Footer } = Layout;

// Kích hoạt plugin UTC và timezone
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("UTC");

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    useEffect(() => {
        configureApiInterceptors(navigate);
    }, [navigate]);

    const { isAuthenticated, authData, clearAuth } = useAuthStore();

    const handleLogout = () => {
        clearAuth();
        navigate("/dang-nhap");
    };

    return (
        <Layout>
            <Sidebar />
            <Layout style={{ minHeight: "100vh" }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex justify="end" align="center" style={{ marginRight: "15px" }}>
                        {isAuthenticated ? (
                            <Flex align="center" gap={10}>
                                <span>Xin chào, {authData.userName}</span>
                                <Button type="link" onClick={handleLogout}>
                                    Đăng xuất
                                </Button>
                            </Flex>
                        ) : (
                            <Link to="/dang-nhap">Đăng nhập</Link>
                        )}
                    </Flex>
                </Header>
                <Content style={{ margin: "15px 10px 0" }}>
                    <div style={{
                        padding: 12,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}>
                        <AppRoutes />
                    </div>
                </Content>
                <Footer style={{ background: colorBgContainer, padding: '10px 0' }}>
                    <Flex justify="center" align="center" vertical>
                        <div>©{new Date().getFullYear()} . Trường Đại học Thủy lợi</div>
                        <div>Số 175, Tây Sơn, Đống Đa, Hà Nội</div>
                    </Flex>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;