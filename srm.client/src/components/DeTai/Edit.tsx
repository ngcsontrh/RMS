import { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Breadcrumb, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Error, Loading } from '../commons';
import { useQuery } from '@tanstack/react-query';
import { DeTaiData } from '../../models/data';
import { createDeTai, editDeTai, getDetai } from '../../services/DeTaiService';
import { getCapDeTais } from '../../services/CapDeTaiService';
import { getDonViChuTris } from '../../services/DonViChuTriService';
import { getTacGiaDropDownData } from '../../services/TacGiaService';
import dayjs from 'dayjs';
import CreatableSelect from 'react-select/creatable';

const { TextArea } = Input;

interface Option {
    value: string | number;
    label: string;
}

export default () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { id: idString } = useParams<{ id: string }>();
    const id = idString ? Number(idString) : undefined;    
    const navigate = useNavigate();
    const [selectedDonViChuTri, setSelectedDonViChuTri] = useState<Option | undefined>(undefined);
    const [selectedCapDeTai, setSelectedCapDeTai] = useState<Option | undefined>(undefined);
    const [selectedChuNhiem, setSelectedChuNhiem] = useState<Option | undefined>(undefined);

    // Fetch dữ liệu đề tài
    const { data: deTaiData, isLoading: isDeTaiLoading, error: deTaiError } = useQuery({
        queryKey: ['deTai', id],
        queryFn: () => getDetai(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (deTaiData) {

            // Set giá trị form
            form.setFieldsValue({
                ...deTaiData,
                ngayBatDau: deTaiData.ngayBatDau ? dayjs.utc(deTaiData.ngayBatDau).tz("Asia/Ho_Chi_Minh") : null,
                ngayKetThuc: deTaiData.ngayKetThuc ? dayjs.utc(deTaiData.ngayKetThuc).tz("Asia/Ho_Chi_Minh") : null,
            });
        }
    }, [deTaiData, form]);

    // Fetch danh sách tác giả
    const { data: tacGiaDatas } = useQuery({
        queryKey: ['tacGias'],
        queryFn: () => getTacGiaDropDownData(),
    });

    const tacGiaOptions: Option[] | undefined = tacGiaDatas?.map((item) => ({
        value: item.id?.toString()!,
        label: item.ten!,
    })) ?? [];

    // Fetch danh sách cấp đề tài
    const { data: capDeTaiPage } = useQuery({
        queryKey: ['capDeTais'],
        queryFn: () => getCapDeTais({ pageIndex: 1, pageSize: 1000 }),
    });

    const capDeTaiOptions: Option[] | undefined = capDeTaiPage?.items?.map((item) => ({
        value: item.id!,
        label: item.ten!,
    })) ?? [];

    // Fetch danh sách cấp đề tài
    const { data: donViChuTriPage } = useQuery({
        queryKey: ['capDeTais'],
        queryFn: () => getDonViChuTris({ pageIndex: 1, pageSize: 1000 }),
    });

    const donViChuTriOptions: Option[] | undefined = donViChuTriPage?.items?.map((item) => ({
        value: item.id!,
        label: item.ten!,
    })) ?? [];

    // Xử lý submit form
    const onFinish = async (values: any) => {
        try {
            console.log(values);
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
                donViChuTriId: typeof values.donViChuTriId.value === 'number' ? values.capDeTaiId.value : null,
                tenDonViChuTri: typeof values.donViChuTriId.value === 'string' ? values.donViChuTriId.value : null,
                capDeTaiId: typeof values.capDeTaiId.value === 'number' ? values.capDeTaiId.value : null,
                tenCapDeTai: typeof values.capDeTaiId.value === 'string' ? values.capDeTaiId.value : null,
                chuNhiem: values.chuNhiem.value,
                canBoThamGias: values.canBoThamGias,
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

    useEffect(() => {
        if (!deTaiData) return;

        const newSelectedCapDeTai = capDeTaiOptions?.find(item => item.value === deTaiData?.capDeTaiId);
        if (newSelectedCapDeTai && newSelectedCapDeTai.value !== selectedCapDeTai?.value) {
            setSelectedCapDeTai(newSelectedCapDeTai);
        }
        console.log(selectedCapDeTai);
    }, [deTaiData, capDeTaiOptions, selectedCapDeTai]);

    useEffect(() => {
        if (!deTaiData) return;

        const newSelectedDonViChuTri = donViChuTriOptions?.find(item => item.value === deTaiData?.donViChuTriId);
        if (newSelectedDonViChuTri && newSelectedDonViChuTri.value !== selectedDonViChuTri?.value) {
            setSelectedDonViChuTri(newSelectedDonViChuTri);
        }
        console.log(selectedDonViChuTri);
    }, [deTaiData, donViChuTriOptions, selectedDonViChuTri]);

    useEffect(() => {
        if (!deTaiData) return;

        const newSelectedChuNhiem = tacGiaOptions?.find(item => item.value === deTaiData?.chuNhiem);
        if (newSelectedChuNhiem && newSelectedChuNhiem.value !== selectedChuNhiem?.value) {
            setSelectedChuNhiem(newSelectedChuNhiem);
        }
        console.log(selectedChuNhiem);
    }, [deTaiData, tacGiaOptions, selectedChuNhiem]);

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
                                <CreatableSelect
                                    isClearable
                                    options={capDeTaiOptions}
                                    placeholder="Chọn hoặc nhập cấp đề tài"
                                    required
                                    defaultValue={capDeTaiOptions.find(value => value.value === deTaiData?.capDeTaiId)}
                                />
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
                            <Form.Item
                                name="donViChuTriId"
                                label="Đơn vị chủ tri"
                                rules={[{ required: true, message: 'Vui lòng chọn đơn vị chủ trì!' }]}
                                initialValue={ donViChuTriOptions.find(value => value.value === deTaiData?.donViChuTriId)}
                            >
                                <CreatableSelect
                                    isClearable
                                    options={donViChuTriOptions}
                                    placeholder="Chọn hoặc nhập đơn vị chủ trì"
                                    required
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="chuNhiem"
                                label="Chủ nhiệm"
                                rules={[{ required: true, message: 'Vui lòng chọn chủ nhiệm!' }]}
                            >
                                <CreatableSelect
                                    isClearable
                                    options={tacGiaOptions}
                                    placeholder="Chọn hoặc nhập chủ nhiệm"
                                    required
                                    value={selectedChuNhiem}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="canBoThamGias"
                                label="Cán bộ tham gia"
                                rules={[{ required: true, message: 'Vui lòng chọn cán bộ tham gia!' }]}
                            >
                                <Select
                                    mode="tags"
                                    showSearch
                                    placeholder="Chọn cán bộ tham gia"
                                    allowClear
                                    filterOption={(input, option) =>
                                        option?.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                    }
                                >
                                    {tacGiaDatas?.map((item, index) => (
                                        <Select.Option
                                            key={index}
                                            value={item.id?.toString()}
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
            )}            
        </>
    );
};