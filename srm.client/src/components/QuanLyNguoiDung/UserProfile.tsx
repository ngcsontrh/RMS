// UserProfile.tsx
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Row, Col, Typography, Select, message } from "antd";
import axios from "axios";

const { Text } = Typography;

interface UserProfileProps {
    userData: any;
    onFinish?: (values: any) => void; // Thêm prop onFinish để gọi lại từ parent
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, onFinish }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const fetched = useRef(false); // Ngăn fetch API lặp lại
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (fetched.current) return; // Chặn gọi API lần 2
        fetched.current = true;
        form.setFieldsValue(userData);
    }, [form, userData]);

    const handleFinish = (values: any) => {
        setLoading(true);
        if (onFinish) {
            onFinish(values); // Gọi hàm onFinish từ parent nếu được truyền vào
        } else {
            // Nếu không có onFinish từ parent, xử lý mặc định
            axios
                .post("/api/update-user-info", values)
                .then(() => {
                    messageApi.success("Cập nhật thành công!");
                })
                .catch(() => {
                    messageApi.error("Lỗi khi cập nhật thông tin");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            {contextHolder}
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mã viên chức" name="staffId">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Chức vụ" name="position">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Đơn vị" name="department">
                            <Select>
                                <Select.Option value="option1">Option 1</Select.Option>
                                <Select.Option value="option2">Option 2</Select.Option>
                                <Select.Option value="option3">Option 3</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Text type="secondary" style={{ fontSize: 12, display: "block", textAlign: "center" }}>
                    *Lưu ý: Bạn có thể đăng nhập bằng Số điện thoại, Mã viên chức hoặc Email
                </Text>
                <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default UserProfile;