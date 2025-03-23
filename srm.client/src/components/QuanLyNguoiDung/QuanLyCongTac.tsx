import React, { useState } from 'react';
import { Breadcrumb, Button, Col, Form, Input, Modal, Row, Table, TableProps, message, Checkbox } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getCapDeTais, editCapDeTai, createCapDeTai } from '../../services/CapDeTaiService'; // Thay đổi service nếu cần
import { CapDeTaiData } from '../../models'; // Thay đổi model nếu cần

// Định nghĩa kiểu dữ liệu cho bảng
interface DataType extends CapDeTaiData {
    key: string;
    stt: number;
    tuNam?: number;
    denNam?: number | null;
    viTriCongTac?: string;
    toChucCongTac?: string;
    diaChiToChuc?: string;
}

// Cột của bảng
const columns: TableProps<DataType>['columns'] = [
    {
        title: <div style={{ textAlign: 'center' }}>STT</div>,
        dataIndex: 'stt',
        key: 'stt',
        width: '5%',
        render: (_, record) => (
            <div style={{ textAlign: 'center' }}>{record.stt + 1}</div>
        ),
    },
    {
        title: <div style={{ textAlign: 'center' }}>Thời gian</div>,
        key: 'thoiGian',
        render: (_, record) => (
            <div style={{ textAlign: 'center' }}>
                {record.tuNam} - {record.denNam || 'Nay'}
            </div>
        ),
    },
    {
        title: <div style={{ textAlign: 'center' }}>Vị trí công tác</div>,
        key: 'viTriCongTac',
        dataIndex: 'viTriCongTac',
        render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
        title: <div style={{ textAlign: 'center' }}>Tổ chức công tác</div>,
        key: 'toChucCongTac',
        dataIndex: 'toChucCongTac',
        render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
        title: <div style={{ textAlign: 'center' }}>Địa chỉ tổ chức</div>,
        key: 'diaChiToChuc',
        dataIndex: 'diaChiToChuc',
        render: (text) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
        title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
        key: 'action',
        render: (_, record) => (
            <div style={{ textAlign: 'center' }}>
                <Button type="link" onClick={() => record.onEdit?.(record)}>
                    Cập nhật
                </Button>
            </div>
        ),
    },
];

const QuanLyCongTac: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<DataType | null>(null);
    const [isDenNay, setIsDenNay] = useState(false);

    // Dữ liệu giả lập (thay thế bằng API thực tế)
    const { data: congTacData, isLoading, error, refetch } = useQuery({
        queryKey: ['congTacData'],
        queryFn: () => getCapDeTais({ pageIndex: 1, pageSize: 10, ten: null }), // Thay đổi API nếu cần
    });

    // Dữ liệu cho bảng
    const dataSource: DataType[] = congTacData?.items?.map((item, index) => ({
        ...item,
        key: item.id!.toString(),
        stt: index,
        tuNam: item.tuNam || 2020, // Dữ liệu giả lập
        denNam: item.denNam || null,
        viTriCongTac: item.viTriCongTac || 'Chuyên ngành Tiền sĩ',
        toChucCongTac: item.toChucCongTac || 'Đại học Cần Thơ',
        diaChiToChuc: item.diaChiToChuc || 'Cần Thơ',
        onEdit: (record: DataType) => handleEdit(record),
    })) || [];

    const handleCreateNew = () => {
        form.resetFields();
        setEditData(null);
        setIsDenNay(false);
        setIsModalOpen(true);
    };

    const handleEdit = (record: DataType) => {
        setEditData(record);
        setIsDenNay(!record.denNam); // Nếu không có đến năm, check "Đến nay"
        form.setFieldsValue({
            tuNam: record.tuNam,
            denNam: record.denNam,
            viTriCongTac: record.viTriCongTac,
            toChucCongTac: record.toChucCongTac,
            diaChiToChuc: record.diaChiToChuc,
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setEditData(null);
        form.resetFields();
        setIsDenNay(false);
    };

    const handleFinish = async (values: any) => {
        try {
            const dataToSubmit = {
                ...values,
                denNam: isDenNay ? null : values.denNam, // Nếu "Đến nay" được chọn, denNam là null
            };
            if (editData.id) {
                // Cập nhật công tác
                await editCapDeTai(editData.id, dataToSubmit);
                messageApi.success('Cập nhật thành công');
            } else {
                // Tạo mới công tác
                await createCapDeTai(dataToSubmit);
                messageApi.success('Tạo mới thành công');
            }
            setIsModalOpen(false);
            setEditData(null);
            form.resetFields();
            setIsDenNay(false);
            refetch(); // Làm mới danh sách công tác
        } catch (err) {
            messageApi.error('Có lỗi xảy ra');
            console.error(err);
        }
    };

    if (error) return <div>{(error as Error).message}</div>;

    return (
        <>
            {contextHolder}
            <Breadcrumb
                style={{ marginTop: '10px' }}
                items={[{ title: 'Quản lý người dùng' }, { title: 'Quản lý công tác' }]}
            />
            <div style={{ marginTop: '10px' }}>
                <Row justify="end" style={{ marginBottom: '10px' }}>
                    <Button type="primary" onClick={handleCreateNew}>
                        + Thêm quá trình công tác
                    </Button>
                </Row>
                <Table<DataType>
                    size="small"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    loading={isLoading}
                />
            </div>

            {/* Modal để thêm/cập nhật công tác */}
            <Modal
                title="Thêm quá trình công tác"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Từ năm *"
                                name="tuNam"
                                rules={[{ required: true, message: 'Vui lòng nhập từ năm' }]}
                            >
                                <Input type="number" placeholder="Từ năm" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Đến năm *"
                                name="denNam"
                                rules={[
                                    {
                                        required: !isDenNay,
                                        message: 'Vui lòng nhập đến năm hoặc chọn "Đến nay"',
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Đến năm"
                                    disabled={isDenNay}
                                />
                            </Form.Item>
                            <Checkbox
                                checked={isDenNay}
                                onChange={(e) => {
                                    setIsDenNay(e.target.checked);
                                    if (e.target.checked) {
                                        form.setFieldsValue({ denNam: null });
                                    }
                                }}
                            >
                                Đến nay
                            </Checkbox>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Vị trí công tác *"
                        name="viTriCongTac"
                        rules={[{ required: true, message: 'Vui lòng nhập vị trí công tác' }]}
                    >
                        <Input placeholder="Vị trí công tác" />
                    </Form.Item>
                    <Form.Item
                        label="Tổ chức công tác *"
                        name="toChucCongTac"
                        rules={[{ required: true, message: 'Vui lòng nhập tổ chức công tác' }]}
                    >
                        <Input placeholder="Tổ chức công tác" />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ tổ chức"
                        name="diaChiToChuc"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ tổ chức' }]}
                    >
                        <Input placeholder="Địa chỉ tổ chức" />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default QuanLyCongTac;