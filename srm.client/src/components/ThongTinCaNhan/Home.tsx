import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Select, Button, Row, Col, Typography, Card, message } from "antd";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const PersonalInfoForm: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const fetched = useRef(false); // Ngăn fetch API lặp lại

    useEffect(() => {
        if (fetched.current) return; // Chặn gọi API lần 2
        fetched.current = true;
        axios.get("/api/tac-gia/1")
            .then(response => {
                form.setFieldsValue(response.data);
            })
            .catch(error => {
                message.error("Lỗi khi tải dữ liệu cá nhân", error);
            });
    }, []);

    const onFinish = (values: any) => {
        setLoading(true);
        axios.post("/api/update-user-info", values)
            .then(() => {
                message.success("Cập nhật thành công!");
            })
            .catch(() => {
                message.error("Lỗi khi cập nhật thông tin");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Card style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
            <Title level={3} style={{ textAlign: "center" }}>
                THÔNG TIN CÁ NHÂN
            </Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Họ Và Tên" name="fullName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã viên chức" name="staffId">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giới tính" name="gender">
                            <Select>
                                <Option value="Nam">Nam</Option>
                                <Option value="Nữ">Nữ</Option>
                            </Select>
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
                <Form.Item label="Đơn vị" name="department">
                    <Input />
                </Form.Item>
                <Text type="secondary" style={{ fontSize: 12, display: "block", textAlign: "center" }}>
                    *Lưu ý: Bạn có thể đăng nhập bằng Số điện thoại, Mã viên chức hoặc Email
                </Text>
                <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default PersonalInfoForm;
