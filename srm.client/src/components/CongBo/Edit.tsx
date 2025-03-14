import { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col, message, DatePicker, InputNumber, Select, Breadcrumb, Upload, Radio, Typography } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Error, Loading } from '../commons';
import { useQuery } from '@tanstack/react-query';
import { CongBoData, NoiDangBaoData, ThanhQuaData } from '../../models/data';
import { TacGiaJson } from '../../models/json'
import { getTacGiaDropDownData } from '../../services/TacGiaService';
import { getNoiDangBaos } from '../../services/NoiDangBaoService';
import { editCongBo, createCongBo, getCongBo } from '../../services/CongBoService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getThanhQuas } from '../../services/ThanhQuaService';

dayjs.extend(utc);
dayjs.extend(timezone);

const { Text } = Typography;

export default () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { id: idString } = useParams<{ id: string }>();
    const id = idString ? Number(idString) : undefined;
    const navigate = useNavigate();
    const [tacGiaJsons, setTacGiaJsons] = useState<TacGiaJson[]>([]);
    const [noiDangBaoDatas, setNoiDangBaoDatas] = useState<NoiDangBaoData[]>([]);
    const [ThanhQuaDatas, setThanhQuaDatas] = useState<ThanhQuaData[]>([]);

    const [base64String, setBase64String] = useState<string>('');

    // Fetch danh sách tác giả
    const { data: tacGiaDropDownDatas } = useQuery({
        queryKey: ['tacGias'],
        queryFn: () => getTacGiaDropDownData(),
    });

    useEffect(() => {
        if (tacGiaDropDownDatas) {
            setTacGiaJsons(tacGiaDropDownDatas.map(item => ({
                id: item.id,
                ten: item.ten,
            })));
        }
    }, [tacGiaDropDownDatas]);

    // Fetch danh sách nơi đăng báo
    const { data: noiDangBaoPage } = useQuery({
        queryKey: ['noiDangBaos'],
        queryFn: () => getNoiDangBaos({ pageIndex: 1, pageSize: 1000 }),
    });

    useEffect(() => {
        if (noiDangBaoPage && noiDangBaoPage.data) {
            setNoiDangBaoDatas(noiDangBaoPage.data);
        }
    }, [noiDangBaoPage]);
    // Fetch danh sách nơi đăng báo
    const { data: thanhQuaPage } = useQuery({
        queryKey: ['thanhQuas'],
        queryFn: () => getThanhQuas({ pageIndex: 1, pageSize: 1000 }),
    });

    useEffect(() => {
        if (thanhQuaPage && thanhQuaPage.data) {
            setThanhQuaDatas(thanhQuaPage.data);
        }
    }, [thanhQuaPage]);

    // Fetch dữ liệu công bố
    const { data: congBoData, isLoading: isCongBoLoading, error: congBoError } = useQuery({
        queryKey: ['congBo', id],
        queryFn: () => getCongBo(id!),
        enabled: id !== undefined && !isNaN(id),
    });

    useEffect(() => {
        if (congBoData) {
            let updatedTacGiaJsons = [...tacGiaJsons];
            const tacGiaLienHe = congBoData.tacGiaLienHe;
            const tacGiaChinh = congBoData.tacGiaChinh;
            const dongTacGias = congBoData.dongTacGias || [];

            if (tacGiaLienHe) {
                const exists = tacGiaJsons.some(
                    (item) => item.id === tacGiaLienHe.id && item.ten === tacGiaLienHe.ten
                );
                if (!exists) {
                    updatedTacGiaJsons = [...updatedTacGiaJsons, tacGiaLienHe];
                }
            }

            if (tacGiaChinh) {
                const exists = tacGiaJsons.some(
                    (item) => item.id === tacGiaChinh.id && item.ten === tacGiaChinh.ten
                );
                if (!exists) {
                    updatedTacGiaJsons = [...updatedTacGiaJsons, tacGiaChinh];
                }
            }

            dongTacGias.forEach((tacGia) => {
                const exists = updatedTacGiaJsons.some(
                    (item) => item.id === tacGia.id && item.ten === tacGia.ten
                );
                if (!exists) {
                    updatedTacGiaJsons = [...updatedTacGiaJsons, tacGia];
                }
            });

            setTacGiaJsons(updatedTacGiaJsons);

            form.setFieldsValue({
                noiDangBaoId: congBoData.noiDangBaoId || congBoData.tenNoiDangBao || null,
                linkMinhChung: congBoData.linkMinhChungTapChi || null,
                tenCongBo: congBoData.ten || null,
                noiCongBo: congBoData.diaDiem || null,
                tenTapChi: congBoData.tenTapChi || null,
                nhaXuatBan: congBoData.nhaXuatBan || null,
                fileMinhChungBaiBao: congBoData.fileMinhChungBaiBao || null,
                linkBaiBao: congBoData.linkBaiBao || null,
                ngayGuiDang: congBoData.ngayGuiDang ? dayjs.utc(congBoData.ngayGuiDang).tz("Asia/Ho_Chi_Minh") : null,
                ngayCongBo: congBoData.ngayCongBo ? dayjs.utc(congBoData.ngayCongBo).tz("Asia/Ho_Chi_Minh") : null,
                IF: congBoData.chiSoTacDong || null,
                Issue: congBoData.ky || null,
                Volume: congBoData.tap || null,
                Trang: congBoData.trang || null,
                diemHoiDong: congBoData.diemHoiDong || null,
                tenHoiDongChucDanh: congBoData.tenHoiDong || null,
                loaiQ: congBoData.loaiQ || 'none',
                thanhqua: congBoData.tenThanhQua === 'Lấy giờ khoa học' ? 'gioKhoahoc' : congBoData.tenThanhQua === 'Lấy kinh phí hỗ trợ' ? 'kinhphihotro' : null,
                linkMinhChungLoai: congBoData.linkMinhChungLoaiQ || null,
                tacGiaChiuTrachNghiems: tacGiaLienHe ? [JSON.stringify(tacGiaLienHe)] : null,
                tacGiaThuNhat: tacGiaChinh ? [JSON.stringify(tacGiaChinh)] : null,
                dongTacGias: dongTacGias.map((item) => JSON.stringify(item)),
                loaiHoTro: "Loại I - “Corresponding author” và tác giả thứ nhất là CBGV thuộc biên chế của Trường",
                phanChiaSuDongGop: congBoData.phanChiaSuDongGop || 'auto',
            });

            if (congBoData.fileMinhChungBaiBao) {
                setBase64String(congBoData.fileMinhChungBaiBao);
            }
        }
    }, [congBoData, form]);

    // Xử lý submit form
    const onFinish = async (values: any) => {
        try {
            console.log('Form Values:', values);
            const thanhQua = values.thanhQuaID ? JSON.parse(values.thanhQuaID) : null;
            const noidangbao = values.noiDangBao ? JSON.parse(values.noiDangBao) : null;
            const formData: CongBoData = {
                noiDangBaoId: noidangbao.id||null,
                tenNoiDangBao: noidangbao.ten ||null,
                linkMinhChungTapChi: values.linkMinhChung || null,
                ten: values.tenCongBo || null,
                diaDiem: values.noiCongBo || null,
                tenTapChi: values.tenTapChi || null,
                nhaXuatBan: values.nhaXuatBan || null,
                fileMinhChungBaiBao: base64String || null,
                linkBaiBao: values.linkBaiBao || null,
                ngayGuiDang: values.ngayGuiDang ? values.ngayGuiDang.toDate() : null,
                ngayCongBo: values.ngayCongBo ? values.ngayCongBo.toDate() : null,
                chiSoTacDong: values.IF || 0,
                ky: values.Issue || 0,
                tap: values.Volume || 0,
                trang: values.Trang || 0,
                diemHoiDong: values.diemHoiDong || 0,
                tenHoiDong: values.tenHoiDongChucDanh || null,
                loaiQ: values.loaiQ || "none",
                thanhQuaId: thanhQua ? thanhQua.id : null, // Lấy id từ object
                tenThanhQua: thanhQua ? thanhQua.ten : null, // Lấy ten từ object
                linkMinhChungLoaiQ: values.linkMinhChungLoai || null,
                // Parse chuỗi JSON thành object
                tacGiaLienHe: values.tacGiaChiuTrachNghiems && values.tacGiaChiuTrachNghiems.length > 0
                    ? JSON.parse(values.tacGiaChiuTrachNghiems[0])
                    : null,
                tacGiaChinh: values.tacGiaThuNhat && values.tacGiaThuNhat.length > 0
                    ? JSON.parse(values.tacGiaThuNhat[0])
                    : null,
                dongTacGias: values.dongTacGias
                    ? values.dongTacGias.map((item: string) => JSON.parse(item))
                    : [],
                loaiHoTroChiPhi: values.loaiHoTro,
                phanChiaSuDongGop: values.phanChiaSuDongGop || 'auto',
            };
            console.log('Form Data:', formData); // Log dữ liệu gửi đi để kiểm tra

           
            if (id !== undefined && !isNaN(id)) {
                await editCongBo(id, formData);
                messageApi.success('Cập nhật công bố thành công!');
            } else {
                await createCongBo(formData);
                messageApi.success('Tạo công bố thành công!');
            }
            navigate('/cong-bo');
        } catch (error: any) {
            console.error('Error in onFinish:', error); // Log lỗi chi tiết
            messageApi.error(error.message || 'Xảy ra lỗi khi xử lý!');
        }
    };

    const handleFileChange = (file: File) => {
        if (file.type !== 'application/pdf') {
            message.error('Chỉ chấp nhận file PDF!');
            return false;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setBase64String(reader.result);
                form.setFieldsValue({ fileMinhChungBaiBao: file.name });
                console.log('Base64 PDF:', reader.result);
            }
        };
        reader.onerror = (error) => {
            message.error('Lỗi khi đọc file PDF!');
            console.error('File reading error:', error);
        };

        return false;
    };

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{ marginTop: '10px' }}
                items={[{ title: 'Công bố' }, { title: id !== undefined && !isNaN(id) ? 'Cập nhật' : 'Ghi lại' }]}
            />
            {isCongBoLoading &&
                <div style={{ marginTop: '10px' }}>
                    <Loading />
                </div>
            }
            {congBoError && <Error />}
            {(!congBoError && !isCongBoLoading) && (
                <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: '10px' }}>
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                name="noiDangBao"
                                label="Nơi Đăng Báo"
                                rules={[{ required: true, message: 'Vui lòng chọn nơi đăng báo.' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn hoặc nhập nơi đăng báo"
                                    allowClear
                                    filterOption={(input, option) =>
                                        option!.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const target = e.target as HTMLInputElement;
                                            const value = target.value;
                                            if (value && !noiDangBaoDatas.some((item) => item.ten === value)) {
                                                setNoiDangBaoDatas([...noiDangBaoDatas, { id: null, ten: value }]);
                                                form.setFieldsValue({
                                                    noiDangBaoId: value,
                                                });
                                            }
                                        }
                                    }}
                                >
                                    {noiDangBaoDatas.map((item, index) => (
                                        <Select.Option
                                            key={index}
                                            value={JSON.stringify({id: item.id , ten:item.ten})}
                                            style={{ color: item.id ? 'blue' : 'black' }}
                                        >
                                            {item.id ? `${item.id}. ${item.ten}` : item.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="linkMinhChung" label="Link minh chứng danh mục tạp chí" rules={[{ required: false }]}>
                                <Input placeholder="Link minh chứng danh mục tạp chí" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="tenCongBo" label="Tên công bố" rules={[{ required: true, message: 'Vui lòng nhập tên công bố!' }]}>
                                <Input placeholder="Nhập Tên công bố" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="noiCongBo" label="Nơi công bố" rules={[{ required: false }]}>
                                <Input placeholder="Nhập nơi công bố" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tenTapChi"
                                label="Tên tạp chí (Hội thảo)"
                                rules={[{ required: true, message: 'Vui lòng nhập tên tạp chí (Hội thảo)' }]}
                            >
                                <Input placeholder="Nhập tên tạp chí (Hội thảo)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="nhaXuatBan"
                                label="Nhà xuất bản (Publisher)"
                                rules={[{ required: true, message: 'Vui lòng nhập nhà xuất bản' }]}
                            >
                                <Input placeholder="Nhập nhà xuất bản (Publisher)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fileMinhChungBaiBao"
                                label="File minh chứng bài báo (PDF)"
                                extra="Bao gồm: Trang bìa tập chí (bìa đầu và bìa cuối), trang mục lục, toàn văn các trang bài báo"
                                rules={[{ required: true, message: 'Vui lòng nhập file minh chứng bài báo' }]}
                            >
                                <Upload
                                    accept="application/pdf"
                                    beforeUpload={(file) => handleFileChange(file)}
                                    maxCount={1}
                                    fileList={base64String ? [{ uid: '-1', name: form.getFieldValue('fileMinhChungBaiBao') || 'File PDF' }] : []}
                                >
                                    <Button style={{ width: '100%' }} icon={<UploadOutlined />}>
                                        Chọn tệp - Không có tệp nào được chọn
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="linkBaiBao" label="Link bài báo" rules={[{ required: false }]}>
                                <Input placeholder="Nhập Link bài báo" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="ngayGuiDang" label="Ngày Gửi Đăng" rules={[{ required: false }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Ngày Gửi Đăng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="ngayCongBo"
                                label="Ngày Công Bố"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày công bố' }]}
                                initialValue={dayjs()}
                            >
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Ngày Công Bố" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="IF" label="Chỉ số tác động (IF)">
                                <InputNumber style={{ width: '100%' }} step={0.001} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="Issue" label="Kỳ (Issue)">
                                <InputNumber style={{ width: '100%' }} step={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="Volume" label="Tập (Vol)">
                                <InputNumber style={{ width: '100%' }} step={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="Trang" label="Trang" rules={[{ required: true, message: 'Vui lòng nhập trang!' }]}>
                                <Input placeholder="Nhập Trang" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="diemHoiDong"
                                label="Điểm của hội đồng chức danh"
                                rules={[{ required: true, message: 'Vui lòng nhập điểm của hội đồng chức danh!' }]}
                            >
                                <InputNumber style={{ width: '100%' }} step={0.25} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tenHoiDongChucDanh"
                                label="Tên hội đồng chức danh"
                                rules={[{ required: true, message: 'Vui lòng nhập tên hội đồng chức danh!' }]}
                            >
                                <Input placeholder="Chức danh theo hội đồng giáo sư ngành nào" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="loaiQ" extra="(chỉ áp dụng cho công bố quốc tế)" label="Loại(Q)" rules={[{ required: false }]}>
                                <Select defaultValue="none" style={{ width: '100%' }}>
                                    <Select.Option value="none" style={{ color: 'gray' }}>None</Select.Option>
                                    {["1","2","3","4"].map((item) => (
                                        <Select.Option key={item} value={item} style={{ color: 'blue' }}>{item}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="thanhQuaID"
                                label="Thành Quả"
                                rules={[{ required: true, message: 'Vui lòng chọn thành quả.' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn hoặc nhập thành quả"
                                    allowClear
                                    filterOption={(input, option) =>
                                        option!.children?.toString().toLowerCase().includes(input.toLowerCase()) || input === ''
                                    }

                                >
                                    {ThanhQuaDatas.map((item, index) => (
                                        <Select.Option
                                            key={index}
                                            value={JSON.stringify({ id: item.id, ten: item.ten })} // Lưu cả id và ten dưới dạng chuỗi JSON
                                            style={{ color: item.id ? 'blue' : 'black' }}
                                        >
                                            {item.id ? `${item.id}. ${item.ten}` : item.ten}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="linkMinhChungLoai"
                                label="Link minh chứng Loại (Q)"
                                extra="Đánh dấu tác giả và người tham gia bằng cách chọn trong danh sách tìm kiếm. Những cán bộ ngoài Trường thì nhập đầy đủ họ tên sau đó gõ dấu phẩy hoặc nhấn Enter"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="Nhập Link minh chứng Loại (Q)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="tacGiaChiuTrachNghiems"
                                label="Tác giả chịu trách nhiệm (Corresponding)"
                                rules={[{ required: true, message: 'Vui lòng chọn Tác giả chịu trách nhiệm!' }]}
                                extra="Trường hợp không xác định được tác giả chịu trách nhiệm thì nhập Tác giả chịu trách nhiệm trùng với Tác giả thứ nhất"
                            >
                                <Select
                                    mode="multiple"
                                    showSearch
                                    placeholder="Tác giả chịu trách nhiệm"
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
                                name="tacGiaThuNhat"
                                label="Tác giả Thứ Nhất"
                                rules={[{ required: true, message: 'Vui lòng chọn Tác giả thứ nhất!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    showSearch
                                    placeholder="Tác giả thứ nhất"
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
                            <Form.Item name="dongTacGias" label="Đồng tác giả">
                                <Select
                                    mode="multiple"
                                    showSearch
                                    placeholder="Đồng tác giả"
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
                        <Col span="12">
                            <Form.Item
                                name="loaiHoTro"
                                label="Loại hỗ trợ kinh phí"
                                initialValue="Loại I - “Corresponding author” và tác giả thứ nhất là CBGV thuộc biên chế của Trường" // Thêm initialValue
                            >
                                <Select
                                    defaultValue="Loại I - “Corresponding author” và tác giả thứ nhất là CBGV thuộc biên chế của Trường"
                                    style={{ width: '100%' }}
                                    disabled // Vô hiệu hóa Select để không cho thay đổi
                                >
                                    <Select.Option
                                        value="Loại I - “Corresponding author” và tác giả thứ nhất là CBGV thuộc biên chế của Trường"
                                        style={{ color: 'blue' }}
                                    >
                                        Loại I - “Corresponding author” và tác giả thứ nhất là CBGV thuộc biên chế của Trường
                                    </Select.Option>
                                </Select>
                            </Form.Item>

                        </Col>
                       
                        <Col span={12}>
                            <Form.Item name="phanChiaSuDongGop" label="Phân chia sự đóng góp">
                                <Radio.Group defaultValue="auto">
                                    <Radio value="auto">Tự động</Radio>
                                    <Radio value="custom">
                                        Tùy chỉnh <EditOutlined style={{ marginLeft: 5 }} />
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Text type="secondary">
                            <i>Lưu ý: Yêu cầu khai đầy đủ tác giả chính và các thành viên tham gia!</i>
                        </Text>
                    </Row>
                    <Row justify="center" style={{ marginTop: '10px' }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isCongBoLoading}>
                                {id !== undefined && !isNaN(id) ? 'Cập nhật' : 'Ghi lại'}
                            </Button>
                            <Button style={{ marginLeft: '8px' }} onClick={() => navigate('/cong-bo')}>
                                Quay lại
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            )}
        </>
    );
};