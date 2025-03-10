import { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Select, Breadcrumb } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CapDeTaiData, DeTaiData } from '../../models/data';
import { TacGiaJson } from '../../models/json';
import { createDeTai, editDeTai, getDetai } from '../../services/DeTaiService';
import { getCapDeTais } from '../../services/CapDeTaiService';
import { getDonViChuTris } from '../../services/DonViChuTriService';
import { getTacGiaDropDownData } from '../../services/TacGiaService';
import dayjs from 'dayjs';

const { TextArea } = Input;

export default () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { id: idString } = useParams<{ id: string }>();
    const id = idString ? Number(idString) : undefined;
    const navigate = useNavigate();
    const [capDeTaiDatas, setCapDeTaiDatas] = useState<CapDeTaiData[]>([]);
    const [donViChuTriDatas, setDonViChuTriDatas] = useState<CapDeTaiData[]>([]);
    const [tacGiaJsons, setTacGiaJsons] = useState<TacGiaJson[]>([]);

    // Fetch danh sách tác giả
    const { data: tacGiaDropDownDatas } = useQuery({
        queryKey: ['tacGias'],
        queryFn: () => getTacGiaDropDownData(),
    });

    useEffect(() => {
        if (tacGiaDropDownDatas) {
            setTacGiaJsons(tacGiaDropDownDatas.map(item => ({
                id: item.id,
                ten: item.ten
            })));
        }
    }, [tacGiaDropDownDatas]);

    // Fetch dữ liệu đề tài
    const { data: deTaiData, isLoading: isDeTaiLoading, error: deTaiError } = useQuery({
        queryKey: ['deTai', id],
        queryFn: () => getDetai(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (deTaiData) {
            let updatedTacGiaJsons = [...tacGiaJsons];
            const chuNhiem = deTaiData.chuNhiem;
            const canBoThamGias = deTaiData.canBoThamGias || [];

            // Xử lý chuNhiem
            if (chuNhiem) {
                const exists = tacGiaJsons.some(
                    (item) => item.id === chuNhiem.id && item.ten === chuNhiem.ten
                );
                if (!exists) {
                    updatedTacGiaJsons = [...updatedTacGiaJsons, chuNhiem];
                }
            }

            // Xử lý canBoThamGias
            canBoThamGias.forEach((canBo) => {
                const exists = updatedTacGiaJsons.some(
                    (item) => item.id === canBo.id && item.ten === canBo.ten
                );
                if (!exists) {
                    updatedTacGiaJsons = [...updatedTacGiaJsons, canBo];
                }
            });

            setTacGiaJsons(updatedTacGiaJsons);

            // Set giá trị form
            form.setFieldsValue({
                ...deTaiData,
                chuNhiem: chuNhiem ? JSON.stringify(chuNhiem) : null,
                canBoThamGias: canBoThamGias.map((item) => JSON.stringify(item)), // Chuyển thành danh sách chuỗi JSON
                ngayBatDau: deTaiData.ngayBatDau ? dayjs.utc(deTaiData.ngayBatDau).tz("Asia/Ho_Chi_Minh") : null,
                ngayKetThuc: deTaiData.ngayKetThuc ? dayjs.utc(deTaiData.ngayKetThuc).tz("Asia/Ho_Chi_Minh") : null,
            });
        }
    }, [deTaiData, form]);

    // Fetch danh sách cấp đề tài
    const { data: capDeTaiPage } = useQuery({
        queryKey: ['capDeTais'],
        queryFn: () => getCapDeTais({ pageIndex: 1, pageSize: 1000 }),
    });

    useEffect(() => {
        if (capDeTaiPage && capDeTaiPage.data) {
            setCapDeTaiDatas(capDeTaiPage.data);
        }
    }, [capDeTaiPage]);

    // Fetch danh sách cấp đề tài
    const { data: donViChuTriPage } = useQuery({
        queryKey: ['capDeTais'],
        queryFn: () => getDonViChuTris({ pageIndex: 1, pageSize: 1000 }),
    });

    useEffect(() => {
        if (donViChuTriPage && donViChuTriPage.data) {
            setDonViChuTriDatas(donViChuTriPage.data);
        }
    }, [donViChuTriPage]);

    // Xử lý submit form
    const onFinish = async (values: any) => {
        try {
            const formData: DeTaiData = {
                ten: values.ten,
                maSo: values.maSo,
                mucTieu: values.mucTieu,
                noiDung: values.noiDung,
                tongKinhPhi: values.tongKinhPhi,
                ngayBatDau: values.ngayBatDau ? values.ngayBatDau.toDate() : null,
                ngayKetThuc: values.ngayKetThuc ? values.ngayKetThuc.toDate() : null,
                kinhPhiHangNam: values.kinhPhiHangNam,
                hoSoNghiemThu: values.hoSoNghiemThu,
                hoSoSanPham: values.hoSoSanPham,
                donViChuTriId: typeof values.donViChuTriId === 'number' ? values.donViChuTriId : null,
                tenDonViChuTri: typeof values.donViChuTriId === 'string' ? values.donViChuTriId : null,
                capDeTaiId: typeof values.capDeTaiId === 'number' ? values.capDeTaiId : null,
                tenCapDeTai: typeof values.capDeTaiId === 'string' ? values.capDeTaiId : null,
                chuNhiem: values.chuNhiem != null ? JSON.parse(values.chuNhiem) : null,
                canBoThamGias: values.canBoThamGias ? values.canBoThamGias.map((item: string) => JSON.parse(item)) : [],
                phanChiaSuDongGop: values.phanChiaSuDongGop,
            };

            if (id !== undefined && !isNaN(id)) {
                await editDeTai(id, formData);
                messageApi.success('Cập nhật đề tài thành công!');
            } else {
                await createDeTai(formData);
                messageApi.success('Tạo đề tài thành công!');
            }
            navigate('/de-tai');
        } catch (error) {
            messageApi.error('Xảy ra lỗi khi xử lý!');
        }
    };

    return (
        <>
            {contextHolder}
            {(isDeTaiLoading) && <div>Đang tải dữ liệu...</div>}
            {(deTaiError) && <div>Lỗi khi tải dữ liệu</div>}
            <Breadcrumb
                style={{ marginTop: "10px" }}
                items={[{ title: "Đề tài" }, { title: id !== undefined && !isNaN(id) ? "Cập nhật" : "Ghi lại" }]}
            />
            <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: "10px" }} >
                <Row gutter={15}>                    
                    <Col span={12}>
                        <Form.Item name="ten" label="Tên đề tài" rules={[{ required: true, message: 'Vui lòng nhập tên đề tài!' }]}>
                            <Input placeholder="Nhập tên đề tài" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="maSo" label="Mã số" rules={[{ required: true, message: 'Vui lòng nhập mã số!' }]}>
                            <Input placeholder="Nhập mã số" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="mucTieu" label="Mục tiêu" rules={[{ required: true, message: 'Vui lòng nhập mục tiêu!' }]}>
                            <TextArea placeholder="Nhập mục tiêu" rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="noiDung" label="Nội dung chính" rules={[{ required: true, message: 'Vui lòng nhập nội dung chính!' }]}>
                            <TextArea placeholder="Nhập nội dung" rows={3} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="capDeTaiId" label="Cấp đề tài" rules={[{ required: true, message: 'Vui lòng chọn cấp đề tài!' }]}>
                            <Select
                                showSearch
                                placeholder="Chọn hoặc nhập cấp đề tài"
                                allowClear
                                filterOption={(input, option) =>
                                    option!.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const target = e.target as HTMLInputElement
                                        const value = target.value;
                                        if (value && !capDeTaiDatas.some((item) => item.ten === value)) {
                                            setCapDeTaiDatas([...capDeTaiDatas, { id: null, ten: value }]);
                                            form.setFieldsValue({
                                                capDeTaiId: value,
                                            });
                                        }
                                    }
                                }}                                
                            >
                                {capDeTaiDatas.map((item, index) => (
                                    <Select.Option key={index} value={item.id} style={{ color: item.id ? 'blue' : 'black' }} >
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="tongKinhPhi" label="Tổng kinh phí" rules={[{ required: true, message: 'Vui lòng nhập tổng kinh phí!' }]}>
                            <InputNumber placeholder="Nhập tổng kinh phí" style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="kinhPhiHangNam" label="Kinh phí hàng năm">
                            <InputNumber placeholder="Nhập kinh phí hàng năm" style={{ width: '100%' }} min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ngayBatDau" label="Thời gian bắt đầu" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian bắt đầu" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="ngayKetThuc" label="Thời gian kết thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Thời gian kết thúc" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="hoSoNghiemThu" label="Hồ sơ nghiệm thu">
                            <Input placeholder="Nhập thông tin hồ sơ nghiệm thu" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="hoSoSanPham" label="Hồ sơ sản phẩm">
                            <Input placeholder="Nhập thông tin hồ sơ sản phẩm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="donViChuTriId" label="Đơn vị chủ tri" rules={[{ required: true, message: 'Vui lòng chọn đơn vị chủ trì!' }]}>
                            <Select
                                showSearch
                                placeholder="Chọn hoặc nhập đơn vị chủ trì"
                                allowClear
                                filterOption={(input, option) =>
                                    option!.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const target = e.target as HTMLInputElement
                                        const value = target.value;
                                        if (value && !capDeTaiDatas.some((item) => item.ten === value)) {
                                            setDonViChuTriDatas([...capDeTaiDatas, { id: null, ten: value }]);
                                            form.setFieldsValue({
                                                donViChuTriId: value,
                                            });
                                        }
                                    }
                                }}
                            >
                                {donViChuTriDatas.map((item, index) => (
                                    <Select.Option key={index} value={item.id} style={{ color: item.id ? 'blue' : 'black' }} >
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="chuNhiem"
                            label="Chủ nhiệm"
                            rules={[{ required: true, message: 'Vui lòng chọn chủ nhiệm!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn chủ nhiệm"
                                allowClear
                                filterOption={(input, option) =>
                                    option?.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                }
                            >
                                {tacGiaJsons.map((item, index) => (
                                    <Select.Option
                                        key={index}
                                        value={JSON.stringify(item)}
                                        style={{ color: item.id ? 'blue' : 'black' }}
                                    >
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="canBoThamGias"
                            label="Cán bộ tham gia"
                            rules={[{ required: true, message: 'Vui lòng chọn cán bộ tham gia!' }]}
                        >
                            <Select
                                mode="multiple"
                                showSearch
                                placeholder="Chọn cán bộ tham gia"
                                allowClear
                                filterOption={(input, option) =>
                                    option?.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                }
                            >
                                {tacGiaJsons.map((item, index) => (
                                    <Select.Option
                                        key={index}
                                        value={JSON.stringify(item)}
                                        style={{ color: item.id ? 'blue' : 'black' }}
                                    >
                                        {item.ten}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="center">
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isDeTaiLoading}>
                            {id !== undefined && !isNaN(id) ? 'Cập nhật' : 'Ghi lại'}
                        </Button>
                        <Button style={{ marginLeft: '8px' }} onClick={() => navigate('/de-tai')}>
                            Quay lại
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
};