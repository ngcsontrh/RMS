import { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Breadcrumb, Select } from 'antd';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { Error, Loading } from '../commons';
import { useQuery } from '@tanstack/react-query';
import { CongBoData } from '../../models/data';
import { createCongBo, editCongBo, getCongBo } from '../../services/CongBoService';
import { getNoiDangBaoDropDownData } from '../../services/NoiDangBaoService';
import { getThanhQuaDropDownData } from '../../services/ThanhQuaService';
import dayjs from 'dayjs';
import { getUserDropdown } from '../../services/UserService';
import FileBase64 from 'react-file-base64';

export default () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { id: idString } = useParams<{ id: string }>();
    const id = idString ? Number(idString) : undefined;
    const navigate = useNavigate();
    const location = useLocation();

    const isToanTruong = location.pathname.startsWith('/toan-truong');

    const { data: congBoData, isLoading: congBoLoading, error: congBoError } = useQuery({
        queryKey: ['congBo', id],
        queryFn: () => getCongBo(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (congBoData) {
            form.setFieldsValue({
                ...congBoData,
                chuNhiem: [congBoData?.tacGiaChinh],
                ngayGuiDang: congBoData?.ngayGuiDang ? dayjs.utc(congBoData.ngayGuiDang).tz("Asia/Ho_Chi_Minh") : null,
                ngayCongBo: congBoData?.ngayCongBo ? dayjs.utc(congBoData.ngayCongBo).tz("Asia/Ho_Chi_Minh") : null,
            });
        }
    }, [congBoData, form]);

    const { data: noiDangBaos, isLoading: noiDangBaoLoading, error: noiDangBaoError } = useQuery({
        queryKey: ['noiDangBaoDropdown'],
        queryFn: () => getNoiDangBaoDropDownData(),
    });

    const { data: thanhQuas, isLoading: thanhQuaLoading, error: thanhQuaError } = useQuery({
        queryKey: ['thanhQuaDropdown'],
        queryFn: () => getThanhQuaDropDownData(),
    });

    const { data: users } = useQuery({
        queryKey: ['userDropdown'],
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
    if (congBoLoading || noiDangBaoLoading || thanhQuaLoading) {
        return (
            <div style={{ marginTop: '10px' }}>
                <Loading />
            </div>
        )
    }

    if (congBoError || noiDangBaoError || thanhQuaError) {
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
                            <Input placeholder="Bắt buộc đối với tạp chí quốc tế như: SCIE, SSCI, Scopus, ISI" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ngayGuiDang" label="Ngày gửi đăng">
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ngayCongBo" label="Ngày công bố" rules={[{ required: true, message: 'Vui lòng nhập ngày công bố!' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="chiSoTacDong" label="Chỉ số tác động (IF)">
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="ky" label="Kỳ (Issue)">
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="tap" label="Tập (Vol)">
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="trang" label="Trang">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="diemHoiDong" label="Điểm của hội đồng chức danh" rules={[{ required: true, message: 'Vui lòng nhập điểm hội đồng chức danh!' }]}>
                            <InputNumber style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>                    
                    <Col span={12}>
                        <Form.Item<CongBoData> name="tenHoiDong" label="Tên hội đồng chức danh" rules={[{ required: true, message: 'Vui lòng nhập tên hội đồng chức danh!' }]}>
                            <Input placeholder="Chức danh theo hội đồng giáo sư ngành nào" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="loaiQ" label="Loại (Q)">
                            <Select
                                options={[
                                    { value: "", label: "none" },
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                    { value: "4", label: "4" }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="thanhQuaId" label="Thành quả">
                            <Select
                                options={thanhQuas?.map(item => ({ value: item.id, label: item.ten }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData> name="linkMinhChungLoaiQ" label="Link minh chứng loại Q">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData>
                            name="tacGiaChinh"
                            label="Tác giả chịu trách nhiệm (Correctsponding)"
                            rules={[
                                { required: true, message: 'Vui lòng chọn tác giả chịu trách nhiệm!' },
                            ]}
                            normalize={(value) => (Array.isArray(value) ? value.slice(0, 1) : value)}
                        >
                            <Select
                                mode="tags"
                                showSearch
                                allowClear
                                options={users?.map(item => ({ value: item.id?.toString(), label: item.fullName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData>
                            name="tacGiaLienHe"
                            label="Tác giả thứ nhất"
                            rules={[
                                { required: true, message: 'Vui lòng chọn tác giả thứ nhất!' },
                            ]}
                            normalize={(value) => (Array.isArray(value) ? value.slice(0, 1) : value)}
                        >
                            <Select
                                mode="tags"
                                showSearch
                                allowClear
                                options={users?.map(item => ({ value: item.id?.toString(), label: item.fullName }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<CongBoData>
                            name="dongTacGias"
                            label="Đồng tác giả"
                        >
                            <Select
                                mode="tags"
                                showSearch
                                allowClear
                                options={users?.map(item => ({ value: item.id?.toString(), label: item.fullName }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {id !== undefined && !isNaN(id) ? 'Cập nhật' : 'Ghi lại'}
                        </Button>
                        <Button style={{ marginLeft: '8px' }}>
                            {isToanTruong ? (
                                <Link to="/toan-truong/cong-bo">
                                    Quay lại
                                </Link>
                            ) : (
                                <Link to="/ca-nhan/cong-bo">
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