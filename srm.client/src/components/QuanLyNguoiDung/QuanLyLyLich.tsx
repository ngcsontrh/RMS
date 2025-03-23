import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Row, Col, Button, message, Select, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;
const { Option } = Select;

interface LyLichInfo {
    noiSinh: string;
    queQuan: string;
    diaHoc: string;
    hocViCaoNhat: string;
    namCongNhanHocVi: string;
    chucDanhKhoaHoc: string;
    namCongNhanChucDanh: string;
    donViLyLich: string;
    diaChiLienHe: string;
    dienThoaiLienHe: string;
    hieuTruong: string;
    namCapBang: string;
    noiCapBang: string;
    chuyenNganhTienSi: string;
    kyThuatPhanMem: string;
    tenDeTaiLuanAn: string;
    nguonGoc1: string;
    nguonGoc2: string;
    mucDoSuDungNguonGoc1: string;
    chucDanhHienCuu: string;
}

const QuanLyLyLich: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const fetched = useRef(false); // Ngăn fetch API lặp lại
    const [messageApi, contextHolder] = message.useMessage();

    // Dữ liệu giả lập
    const LyLichInfo: LyLichInfo = {
        noiSinh: 'Nam Định',
        queQuan: 'Yên Hồng, Ý Yên, Nam Định',
        diaHoc: 'Đại học Công nghệ, Đại học Quốc gia Hà Nội',
        hocViCaoNhat: 'ThS',
        namCongNhanHocVi: '2014',
        chucDanhKhoaHoc: 'Chức danh (viên chức hoặc trước khi nghỉ hưu)',
        namCongNhanChucDanh: '2012',
        donViLyLich: 'Đại học Công nghệ, Đại học Quốc gia Hà Nội',
        diaChiLienHe: 'Cơ quan Đại học',
        dienThoaiLienHe: 'Hiệu trưởng',
        hieuTruong: 'Chính Quy',
        namCapBang: '2012',
        noiCapBang: 'Đại học Công nghệ, Đại học Quốc gia Hà Nội',
        chuyenNganhTienSi: 'Chuyên ngành Tiến sĩ',
        kyThuatPhanMem: 'Kỹ thuật phần mềm',
        tenDeTaiLuanAn: '',
        nguonGoc1: 'Tiếng Anh',
        nguonGoc2: 'Khác',
        mucDoSuDungNguonGoc1: 'Mức độ sử dụng nguồn gốc 1',
        chucDanhHienCuu: '',
    };

    // Set giá trị ban đầu cho form
    useEffect(() => {
        if (fetched.current) return; // Chặn gọi API lần 2
        fetched.current = true;
        form.setFieldsValue(LyLichInfo);
    }, [form, LyLichInfo]);

    // Xử lý khi submit form
    const handleFinish = (values: any) => {
        setLoading(true);
        // Giả lập gọi API
        axios
            .post('/api/update-cong-tac', values)
            .then(() => {
                messageApi.success('Cập nhật thông tin công tác thành công!');
            })
            .catch(() => {
                messageApi.error('Lỗi khi cập nhật thông tin công tác');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {contextHolder}
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nơi sinh" name="noiSinh">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Quê quán" name="queQuan">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Địa học" name="diaHoc">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Học vị cao nhất" name="hocViCaoNhat">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Năm công nhận học vị" name="namCongNhanHocVi">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chức danh khoa học" name="chucDanhKhoaHoc">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Năm công nhận chức danh" name="namCongNhanChucDanh">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Đơn vị công tác" name="donViLyLich">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ liên hệ" name="diaChiLienHe">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Điện thoại liên hệ" name="dienThoaiLienHe">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Hiệu trưởng" name="hieuTruong">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm cấp bằng" name="namCapBang">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nơi cấp bằng" name="noiCapBang">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chuyên ngành Tiến sĩ" name="chuyenNganhTienSi">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Kỹ thuật phần mềm" name="kyThuatPhanMem">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Tên đề tài luận án" name="tenDeTaiLuanAn">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nguồn gốc 1" name="nguonGoc1">
                            <Select>
                                <Option value="Tiếng Anh">Tiếng Anh</Option>
                                <Option value="Tiếng Pháp">Tiếng Pháp</Option>
                                <Option value="Khác">Khác</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mức độ sử dụng nguồn gốc 1" name="mucDoSuDungNguonGoc1">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nguồn gốc 2" name="nguonGoc2">
                            <Select>
                                <Option value="Tiếng Anh">Tiếng Anh</Option>
                                <Option value="Tiếng Pháp">Tiếng Pháp</Option>
                                <Option value="Khác">Khác</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chức danh hiện cứu" name="chucDanhHienCuu">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Text type="secondary" style={{ fontSize: 12, display: 'block', textAlign: 'center' }}>
                    *Lưu ý: Vui lòng kiểm tra kỹ thông tin trước khi cập nhật
                </Text>

                <Form.Item style={{ textAlign: 'center', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default QuanLyLyLich;
