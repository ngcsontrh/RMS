import { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Breadcrumb, Select } from 'antd';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { Error, Loading } from '../commons';
import { useQuery } from '@tanstack/react-query';
import { DeTaiData } from '../../models/data';
import { createDeTai, editDeTai, getDetai } from '../../services/DeTaiService';
import { getCapDeTaiDropdown } from '../../services/CapDeTaiService';
import { getDonViChuTriDropdown } from '../../services/DonViChuTriService';
import dayjs from 'dayjs';
import { getUserDropdown } from '../../services/UserService';
import FileBase64 from 'react-file-base64';

const { TextArea } = Input;

export default () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { id: idString } = useParams<{ id: string }>();
    const id = idString ? Number(idString) : undefined;    
    const navigate = useNavigate();
    const location = useLocation();

    const isToanTruong = location.pathname.startsWith('/toan-truong');

    const { data: deTaiData, isLoading: isDeTaiLoading, error: deTaiError } = useQuery({
        queryKey: ['deTai', id],
        queryFn: () => getDetai(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (deTaiData) {
            form.setFieldsValue({
                ...deTaiData,
                chuNhiem: [deTaiData.chuNhiem],
                ngayBatDau: deTaiData.ngayBatDau ? dayjs.utc(deTaiData.ngayBatDau).tz("Asia/Ho_Chi_Minh") : null,
                ngayKetThuc: deTaiData.ngayKetThuc ? dayjs.utc(deTaiData.ngayKetThuc).tz("Asia/Ho_Chi_Minh") : null,
            });
        }
    }, [deTaiData, form]);  

    const { data: capDeTais } = useQuery({
        queryKey: ['capDeTais'],
        queryFn: () => getCapDeTaiDropdown(),
    });

    const { data: donViChuTris } = useQuery({
        queryKey: ['donViChuTris'],
        queryFn: () => getDonViChuTriDropdown(),
    });

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUserDropdown(),
    });

    const onFinish = async (values: DeTaiData) => {
        try {
            console.log(values);
            const formData: DeTaiData = {
                ...values,
                chuNhiem: values.chuNhiem?.toString()
            }
            if (id !== undefined && !isNaN(id)) {
                await editDeTai(id, formData);
                messageApi.success('Cập nhật đề tài thành công!');
            } else {
                await createDeTai(formData);
                messageApi.success('Tạo đề tài thành công!');
            }
            navigate('/ca-nhan/de-tai');
        } catch (error) {
            messageApi.error('Xảy ra lỗi khi xử lý!');
        }
    };

    return (
        <>
            {contextHolder}            
            <Breadcrumb
                style={{ marginTop: "10px" }}
                items={[{ title: "Đề tài" }, { title: id !== undefined && !isNaN(id) ? "Cập nhật" : "Ghi lại" }]}
            />
            {isDeTaiLoading && 
                <div style={{ marginTop: '10px' }}>
                    <Loading />
                </div>                
            }
            {deTaiError &&
                <Error />
            }
            {(!deTaiError && !isDeTaiLoading) && (
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    style={{ marginTop: "10px" }}
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="ten" label="Tên đề tài" rules={[{ required: true, message: 'Vui lòng nhập tên đề tài!' }]}>
                                <Input placeholder="Nhập tên đề tài" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="capDeTaiId" label="Cấp đề tài" rules={[{ required: true, message: 'Vui lòng chọn cấp đề tài!' }]}>
                                <Select
                                    options={capDeTais?.map(item => ({ value: item.id, label: item.ten }))}
                                    placeholder="Chọn cấp đề tài"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="maSo" label="Mã số" rules={[{ required: true, message: 'Vui lòng nhập mã số!' }]}>
                                <Input placeholder="Nhập mã số" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="tongKinhPhi" label="Tổng kinh phí" rules={[{ required: true, message: 'Vui lòng nhập tổng kinh phí!' }]}>
                                <InputNumber placeholder="Nhập tổng kinh phí" style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="mucTieu" label="Mục tiêu" rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}>
                                <TextArea placeholder="Nhập mục tiêu" rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="noiDung" label="Nội dung chính" rules={[{ required: true, message: 'Vui lòng nhập nội dung chính!' }]}>
                                <TextArea placeholder="Nhập nội dung" rows={3} />
                            </Form.Item>
                        </Col>                                                
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="ngayBatDau" label="Thời gian bắt đầu" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian bắt đầu" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="ngayKetThuc" label="Thời gian kết thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian kết thúc" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData> name="kinhPhiHangNam" label="Kinh phí hàng năm">
                                <InputNumber placeholder="Nhập kinh phí hàng năm" style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='hoSoNghiemThu' label="Hồ sơ nghiệm thu">
                                <FileBase64
                                    multiple={false}
                                    onDone={(result: any) => {
                                        form.setFieldsValue({
                                            hoSoNghiemThu: result.base64
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item name="hoSoSanPham" label="Hồ sơ sản phẩm">
                                <FileBase64
                                    multiple={false}
                                    onDone={(result: any) => {
                                        form.setFieldsValue({
                                            hoSoSanPham: result.base64
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData>
                                name="donViChuTriId"
                                label="Đơn vị chủ tri"
                                rules={[{ required: true, message: 'Vui lòng chọn đơn vị chủ trì!' }]}
                            >
                                <Select
                                    options={donViChuTris?.map(item => ({ value: item.id, label: item.ten }))}
                                    placeholder="Chọn đơn vị chủ trì"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData>
                                name="chuNhiem"
                                label="Chủ nhiệm"
                                rules={[
                                    { required: true, message: 'Vui lòng chọn cán bộ tham gia!' },
                                ]}
                                normalize={(value) => (Array.isArray(value) ? value.slice(0, 1) : value)}
                            >
                                <Select
                                    mode="tags"
                                    showSearch
                                    placeholder="Chủ nhiệm"
                                    allowClear
                                    options={users?.map(item => ({ value: item.id?.toString(), label: item.fullName }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<DeTaiData>
                                name="canBoThamGias"
                                label="Cán bộ tham gia"
                                rules={[{ required: true, message: 'Vui lòng chọn cán bộ tham gia!' }]}
                            >
                                <Select
                                    mode="tags"
                                    showSearch
                                    placeholder="Chọn cán bộ tham gia"
                                    allowClear
                                    options={users?.map(item => ({ value: item.id?.toString(), label: item.fullName }))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isDeTaiLoading}>
                                {id !== undefined && !isNaN(id) ? 'Cập nhật' : 'Ghi lại'}
                            </Button>
                            <Button style={{ marginLeft: '8px' }}>
                                {isToanTruong ? (
                                    <Link to="/toan-truong/de-tai">
                                        Quay lại
                                    </Link>
                                ) : (
                                    <Link to="/ca-nhan/de-tai">
                                        Quay lại
                                    </Link>
                                )}
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            )}            
        </>
    );
};