import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Button, message, Select, Typography, DatePicker } from 'antd';
import { LyLichKhoaHocData } from '../../models/data/LyLichKhoaHocData';
import { getLyLichKhoaHoc, editLyLichKhoaHoc } from '../../services/QuanLyLyLichService';
import { useAuthStore } from '../../stores/authStore';
import { useQuery } from '@tanstack/react-query';

const { Text } = Typography;
const { Option } = Select;

const QuanLyLyLich: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { userId } = useAuthStore();

    const { data: lyLichInfo, isLoading, error, refetch } = useQuery({
        queryKey: ['lyLichKhoaHoc'],
        queryFn: () => getLyLichKhoaHoc(Number(userId)),
    });
    
    useEffect(() => {
        if (lyLichInfo) {
            form.setFieldsValue(lyLichInfo);
        }
    }, [form, lyLichInfo]);

    // Xử lý khi submit form
    const handleFinish = async (values: LyLichKhoaHocData) => {
        try {
            await editLyLichKhoaHoc(lyLichInfo?.id!, values);
            messageApi.success("Thành công");
        } catch (e) {
            messageApi.error("Có lỗi xảy ra");
        }
    };

    return (
        <>
            {contextHolder}
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ngày tháng năm sinh" name="ngayThangNamSinh">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Nơi sinh" name="noiSinh">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Quê quán" name="queQuan">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Dân tộc" name="danToc">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Học vị cao nhất" name="hocViCaoNhat">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm, nơi công nhận học vị" name="namCongNhanHocVi">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Chức danh khoa học (GS, PGS)" name="chucDanhKhoaHoc">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm công nhận, bổ nhiệm" name="namCongNhanChucDanh">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Chức vụ (nếu hiện tại hoặc trước khi nghỉ hưu)" name="chucVu">
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
                        <Form.Item label="Điện thoại liên hệ cơ quan" name="dienThoaiLienHeCoQuan">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Hệ đào tạo" name="heDaoTao">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Chính quy" name="chinhQuy">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nơi công tác" name="noiCongTac">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Nơi đào tạo Thạc sĩ" name="noiDaoTaoThacSi">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Nơi đào tạo Tiến sĩ" name="noiDaoTaoTienSi">
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
                        <Form.Item label="Năm công nhận, Đại học Quốc gia Hà Nội" name="namCongNhanDaiHocQuocGiaHaNoi">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngành Đại học" name="nganhDaiHoc">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Năm tốt nghiệp Đại học" name="namTotNghiepDaiHoc">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm đào tạo Thạc sĩ" name="namDaoTaoThacSi">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Năm cấp bằng Thạc sĩ" name="namCapBangThacSi">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm cấp bằng Tiến sĩ" name="namCapBangTienSi">
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
                        <Form.Item label="Mức độ sử dụng nguồn gốc 2" name="mucDoSuDungNguonGoc2">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Chức danh nghiên cứu" name="chucDanhHienCuu">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Text type="secondary" style={{ fontSize: 12, display: 'block', textAlign: 'center' }}>
                    *Lưu ý: Vui lòng kiểm tra kỹ thông tin trước khi cập nhật
                </Text>

                <Form.Item style={{ textAlign: 'center', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default QuanLyLyLich;