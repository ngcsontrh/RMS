import React from "react";
import { Form, Input, Button, Typography, Flex, message } from "antd";
import { login } from "../../services/UserService";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface LoginForm {
    userName: string;
    password: string;
}

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const { isAuthenticated, setAuth, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate("/");
    }

    const onFinish = async (values: LoginForm) => {
        try {
            // Gọi login service
            var tokenData = await login({
                userName: values.userName,
                password: values.password,
            });            
            setAuth(tokenData.accessToken!);
            message.success("Đăng nhập thành công!");
            navigate("/");
        } catch (error) {
            clearAuth();
            message.error(
                error instanceof Error ? error.message : "Đăng nhập thất bại"
            );
        }
    };

    return (
        <Flex justify="center" align="center" style={{ height: "530px" }}>
            <div>
                <Title level={3} style={{ textAlign: "center" }}>
                    Đăng nhập
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ margin: "auto", padding: 20, width: "400px", height: "400px" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                        ]}
                    >
                        <Input placeholder="Nhập tên đăng nhập" />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
                        <Flex justify="center" align="center" gap={10}>
                            <Button type="primary" htmlType="submit" loading={false}>
                                Đăng nhập
                            </Button>
                            <Button onClick={() => navigate("/forgot-password")}>
                                Quên mật khẩu
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    );
};

export default Login;