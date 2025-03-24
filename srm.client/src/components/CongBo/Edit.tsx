import { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Breadcrumb, Select } from 'antd';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { Error, Loading } from '../commons';
import { useQuery } from '@tanstack/react-query';
import { CongBoData } from '../../models/data';
import { createCongBo, editCongBo, getCongBo } from '../../services/CongBoService';
import { getNoiDangBaoDropDownData } from '../../services/NoiDangBaoService';
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

    const { data: congBoData, isLoading: congBoLoading, error: congBoError } = useQuery({
        queryKey: ['deTai', id],
        queryFn: () => getCongBo(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (congBoData) {
            form.setFieldsValue({
                ...congBoData,
                chuNhiem: [congBoData?.tacGiaChinh],
                ngayGuiDang: congBoData?.ngayGuiDang ? dayjs.utc(congBoData.ngayGuiDang).tz("Asia/Ho_Chi_Minh") : null,
                ngayKetThuc: congBoData?.ngayCongBo ? dayjs.utc(congBoData.ngayCongBo.tz("Asia/Ho_Chi_Minh") : null,
            });
        }
    }, [congBoData, form]);

    const { data: noiDangBaos, isLoading: noiDangBaoLoading, error: noiDangBaoError } = useQuery({
        queryKey: ['noiDangBaos'],
        queryFn: () => getNoiDangBaoDropDownData(),
    });

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUserDropdown(),
    });

    const onFinish = async (values: CongBoData) => {
        try {
            console.log(values);
            const formData: CongBoData = {
                ...values,
                tacGiaChinh: values.tacGiaChinh?.toString(),
                tacGiaLienHe: values.tacGiaLienHe?.toString(),                
            }
            if (id !== undefined && !isNaN(id)) {
                await editCongBo(id, formData);
                messageApi.success('Cập nhật công bố thành công!');
            } else {
                await createCongBo(formData);
                messageApi.success('Tạo công bố thành công!');
            }
            navigate('/ca-nhan/cong-bo');
        } catch (error) {
            messageApi.error('Xảy ra lỗi khi xử lý!');
        }
    };
    if (congBoLoading || noiDangBaoLoading) {
        return (
            <div style={{ marginTop: '10px' }}>
                <Loading />
            </div>
        )
    }

    if (congBoError || noiDangBaoError) {
        return (
            <Error />
        )
    }


    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{ marginTop: "10px" }}
                items={[{ title: "Đề tài" }, { title: id !== undefined && !isNaN(id) ? "Cập nhật" : "Ghi lại" }]}
            />
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                style={{ marginTop: "10px" }}
            >
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="noiDangBaoId" label="Bài báo đăng trên" rules={[{ required: true, message: 'Vui lòng chọn nơi đăng báo!' }]}>
                            <Select
                                options={noiDangBaos?.map(item => ({ value: item.id, label: item.ten }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="linkMinhChungTapChi" label="Link minh chứng danh mục tạp chí">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ten" label="Tên công bố" rules={[{ required: true, message: 'Vui lòng nhập tên công bố!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>                   
                    <Col span={12}>
                        <Form.Item<CongBoData> name="diaDiem" label="Nơi công bố">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="tenTapChi" label="Tên tạp chí (Hội thảo)" rules={[{ required: true, message: 'Vui lòng nhập tên tạp chí!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="nhaXuatBan" label="Nhà xuất bản">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name='fileMinhChungBaiBao' label="File minh chứng bài báo (PDF)">
                            <FileBase64
                                multiple={false}
                                onDone={(result: any) => {
                                    form.setFieldsValue({
                                        fileMinhChungBaiBao: result.base64
                                    });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="linkBaiBao" label="Link bài báo">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="mucTieu" label="Mục tiêu" rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}>
                            <TextArea placeholder="Nhập mục tiêu" rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="noiDung" label="Nội dung chính" rules={[{ required: true, message: 'Vui lòng nhập nội dung chính!' }]}>
                            <TextArea placeholder="Nhập nội dung" rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ngayBatDau" label="Thời gian bắt đầu" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian bắt đầu" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ngayKetThuc" label="Thời gian kết thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian kết thúc" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="kinhPhiHangNam" label="Kinh phí hàng năm">
                            <InputNumber placeholder="Nhập kinh phí hàng năm" style={{ width: '100%' }} min={0} />
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
                        <Form.Item<CongBoData>
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
                        <Form.Item<CongBoData>
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
                        <Form.Item<CongBoData>
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
        </>
    );
};