//import { Button, Form, Input, Row, Col, Breadcrumb, TableProps, Table, message, Popconfirm } from 'antd';
//import { NoiDangBaoData } from '../../models/data';
//import { useState } from 'react';
//import { NoiDangBaoSearch } from '../../models/search';
//import { useQuery } from '@tanstack/react-query';
//import { getNoiDangBaos, editNoiDangBao, createNoiDangBao } from '../../services/NoiDangBaoService';
//import { Pagination } from '../commons';

//interface DataType extends NoiDangBaoData {
//    key: string;
//    stt: number;
//}

//const columns: TableProps<DataType>['columns'] = [
//    {
//        title: <div style={{ textAlign: 'center' }}> STT </div>,
//dataIndex: 'stt',
//    key: 'stt',
//        width: '5%',
//            render: (_, record) => (
//                <div style= {{ textAlign: 'center' }}> { record.stt + 1 } </div>
//        ),
//    },
//{
//    title: <div style={ { textAlign: 'center' } }> Tên nơi đăng báo </div>,
//    key: 'ten',
//        dataIndex: 'ten',
//    },
//];

//const NoiDangBao: React.FC = () => {
//    const [form] = Form.useForm();
//    const [messageApi, contextHolder] = message.useMessage();
//    const [searchParams, setSearchParams] = useState<NoiDangBaoSearch>({
//        pageIndex: 1,
//        pageSize: 10,
//        ten: null,
//    });
//    const [editData, setEditData] = useState<NoiDangBaoData | null>(null);
//    const [isEditing, setIsEditing] = useState<boolean>(false);

//    const { data: noiDangBaoDatas, isLoading, error, refetch } = useQuery({
//        queryKey: ['noiDangBaoData', searchParams],
//        queryFn: () => getNoiDangBaos(searchParams),
//    });

//    const dataSource: DataType[] = noiDangBaoDatas?.data?.map((item, index) => ({
//        ...item,
//        key: item.id!.toString(),
//        stt: (searchParams.pageIndex! - 1) * searchParams.pageSize! + index,
//    })) || [];

//    const totalItems = noiDangBaoDatas?.total ?? dataSource.length;

//    const handlePaginationChange = (pageIndex: number, pageSize: number) => {
//        setSearchParams(prev => ({ ...prev, pageIndex, pageSize }));
//    };

//    const handleRowClick = (record: DataType) => {
//        setEditData({ id: record.id, ten: record.ten });
//        form.setFieldsValue({ ten: record.ten });
//    };

//    const handleCreateNew = () => {
//        form.resetFields();
//        setEditData(null);
//        setIsEditing(true);
//    }

//    const handleEdit = () => {
//        if (!editData) {
//            messageApi.warning('Vui lòng chọn một dòng để chỉnh sửa!');
//            return;
//        }
//        setIsEditing(true);
//    };

//    const handleCancelEdit = () => {
//        if (editData) {
//            form.setFieldsValue({ ten: editData.ten });
//        } else {
//            form.resetFields();
//        }
//        setIsEditing(false);
//    };

//    const onFinish = async (values: any) => {
//        try {
//            if (editData?.id) {
//                await editNoiDangBao(editData.id, { ...editData, ten: values.ten });
//                messageApi.success('Cập nhật thành công');
//            } else {
//                await createNoiDangBao({ ten: values.ten });
//                messageApi.success('Tạo mới thành công');
//            }
//            form.resetFields();
//            setEditData(null);
//            setIsEditing(false)
//            refetch();
//        } catch (err) {
//            messageApi.error('Có lỗi xảy ra');
//            console.error(err);
//        }
//    };

//    if (error) return <div>{(error as Error).message
//}</div>;

//return (
//    <>
//    { contextHolder }
//    < Breadcrumb style = {{ marginTop: '10px' }} items = { [{ title: 'Danh mục' }, { title: 'Nơi đăng báo' }]} />
//        <Row gutter={ 15 } style = {{ marginTop: '10px' }}>
//            <Col span={ 12 }>
//                <Table<DataType>
//                        columns={ columns }
//dataSource = { dataSource }
//pagination = { false}
//loading = { isLoading }
//rowClassName = {() => 'cursor-pointer'}
//onRow = {(record) => ({
//    onClick: () => handleRowClick(record),
//})}
//                    />
//    < Pagination
//current = { searchParams.pageIndex! }
//pageSize = { searchParams.pageSize! }
//total = { totalItems }
//onChange = { handlePaginationChange }
//    />
//    </Col>
//    < Col span = { 12} >
//        <Row gutter={ 10 }>
//            <Col>
//            <Button type="primary" onClick = { handleCreateNew } > Thêm mới </Button>
//                </Col>
//                <Col>
//{
//    isEditing ? (
//        <Popconfirm
//                                    title= "Xác nhận"
//                                    description = "Dữ liệu sẽ không được lưu lại"
//    onConfirm = { handleCancelEdit }
//    okText = "Đồng ý"
//    cancelText = "Hủy"
//        >
//        <Button type="primary" danger > Hủy </Button>
//            </Popconfirm>                                
//                            ) : (
//        <Button type= "primary" onClick = { handleEdit } > Chỉnh sửa </Button>
//                            )
//}
//</Col>
//    </Row>
//    < Form layout = "vertical" form = { form } onFinish = { onFinish } style = {{ marginTop: '10px' }} initialValues = {{ ten: '' }}>
//        <Form.Item
//                            name="ten"
//label = "Tên nơi đăng báo"
//rules = { [{ required: true, message: 'Vui lòng nhập tên nơi đăng báo!' }]}
//    >
//    <Input placeholder="Nhập tên nơi đăng báo" disabled = {!isEditing} />
//        </Form.Item>
//        < Row justify = "center" >
//            <Form.Item>
//            { isEditing && (
//                <Button type="primary" htmlType = "submit" >
//                    Ghi lại
//                        </Button>
//                                )}
//</Form.Item>
//    </Row>
//    </Form>
//    </Col>
//    </Row>
//    </>
//    );
//};

//export default NoiDangBao;
//import { Button, Form, Input, Row, Col, Breadcrumb, TableProps, Table, message, Popconfirm } from 'antd';
//import { useState } from 'react';
//import { useQuery } from '@tanstack/react-query';
//import { Pagination } from '../commons';

//interface NoiDangBaoData {
//    id?: string;
//    ten: string;
//}

//interface NoiDangBaoSearch {
//    pageIndex: number;
//    pageSize: number;
//    ten: string | null;
//}

//interface DataType extends NoiDangBaoData {
//    key: string;
//    stt: number;
//}

//const columns: TableProps<DataType>['columns'] = [
//    {
//        title: <div style={{ textAlign: 'center' }}> STT </div>,
//        dataIndex: 'stt',
//        key: 'stt',
//        width: '5%',
//        render: (_, record) => (
//            <div style={{ textAlign: 'center' }}> {record.stt + 1} </div>
//        ),
//    },
//    {
//        title: <div style={{ textAlign: 'center' }}> Tên nơi đăng báo </div>,
//        key: 'ten',
//        dataIndex: 'ten',
//    },
//];

//const NoiDangBao: React.FC = () => {
//    const [form] = Form.useForm();
//    const [messageApi, contextHolder] = message.useMessage();
//    const [searchParams, setSearchParams] = useState<NoiDangBaoSearch>({
//        pageIndex: 1,
//        pageSize: 10,
//        ten: null,
//    });
//    const [editData, setEditData] = useState<NoiDangBaoData | null>(null);
//    const [isEditing, setIsEditing] = useState<boolean>(false);

//    const { data: noiDangBaoDatas, isLoading, error, refetch } = useQuery({
//        queryKey: ['noiDangBaoData', searchParams],
//        queryFn: () => getNoiDangBaos(searchParams),
//    });

//    const dataSource: DataType[] = noiDangBaoDatas?.data?.map((item, index) => ({
//        ...item,
//        key: item.id!.toString(),
//        stt: (searchParams.pageIndex! - 1) * searchParams.pageSize! + index,
//    })) || [];

//    const totalItems = noiDangBaoDatas?.total ?? dataSource.length;

//    const handlePaginationChange = (pageIndex: number, pageSize: number) => {
//        setSearchParams(prev => ({ ...prev, pageIndex, pageSize }));
//    };

//    const handleRowClick = (record: DataType) => {
//        setEditData({ id: record.id, ten: record.ten });
//        form.setFieldsValue({ ten: record.ten });
//    };

//    const handleCreateNew = () => {
//        form.resetFields();
//        setEditData(null);
//        setIsEditing(true);
//    }

//    const handleEdit = () => {
//        if (!editData) {
//            messageApi.warning('Vui lòng chọn một dòng để chỉnh sửa!');
//            return;
//        }
//        setIsEditing(true);
//    };

//    const handleCancelEdit = () => {
//        if (editData) {
//            form.setFieldsValue({ ten: editData.ten });
//        } else {
//            form.resetFields();
//        }
//        setIsEditing(false);
//    };

//    const onFinish = async (values: any) => {
//        try {
//            if (editData?.id) {
//                await editNoiDangBao(editData.id, { ...editData, ten: values.ten });
//                messageApi.success('Cập nhật thành công');
//            } else {
//                await createNoiDangBao({ ten: values.ten });
//                messageApi.success('Tạo mới thành công');
//            }
//            form.resetFields();
//            setEditData(null);
//            setIsEditing(false)
//            refetch();
//        } catch (err) {
//            messageApi.error('Có lỗi xảy ra');
//            console.error(err);
//        }
//    };

//    if (error) return <div>{(error as Error).message}</div>;

//    return (
//        <>
//            {contextHolder}
//            <Breadcrumb style={{ marginTop: '10px' }} items={[{ title: 'Danh mục' }, { title: 'Nơi đăng báo' }]} />
//            <Row gutter={15} style={{ marginTop: '10px' }}>
//                <Col span={12}>
//                    <Table<DataType>
//                        columns={columns}
//                        dataSource={dataSource}
//                        pagination={false}
//                        loading={isLoading}
//                        rowClassName={() => 'cursor-pointer'}
//                        onRow={(record) => ({
//                            onClick: () => handleRowClick(record),
//                        })}
//                    />
//                    <Pagination
//                        current={searchParams.pageIndex!}
//                        pageSize={searchParams.pageSize!}
//                        total={totalItems}
//                        onChange={handlePaginationChange}
//                    />
//                </Col>
//                <Col span={12}>
//                    <Row gutter={10}>
//                        <Col>
//                            <Button type="primary" onClick={handleCreateNew}>Thêm mới</Button>
//                        </Col>
//                        <Col>
//                            {isEditing ? (
//                                <Popconfirm
//                                    title="Xác nhận"
//                                    description="Dữ liệu sẽ không được lưu lại"
//                                    onConfirm={handleCancelEdit}
//                                    okText="Đồng ý"
//                                    cancelText="Hủy"
//                                >
//                                    <Button type="primary" danger>Hủy</Button>
//                                </Popconfirm>
//                            ) : (
//                                <Button type="primary" onClick={handleEdit}>Chỉnh sửa</Button>
//                            )}
//                        </Col>
//                    </Row>
//                    <Form layout="vertical" form={form} onFinish={onFinish} style={{ marginTop: '10px' }} initialValues={{ ten: '' }}>
//                        <Form.Item
//                            name="ten"
//                            label="Tên nơi đăng báo"
//                            rules={[{ required: true, message: 'Vui lòng nhập tên nơi đăng báo!' }]}
//                        >
//                            <Input placeholder="Nhập tên nơi đăng báo" disabled={!isEditing} />
//                        </Form.Item>
//                        <Row justify="center">
//                            <Form.Item>
//                                {isEditing && (
//                                    <Button type="primary" htmlType="submit">
//                                        Ghi lại
//                                    </Button>
//                                )}
//                            </Form.Item>
//                        </Row>
//                    </Form>
//                </Col>
//            </Row>
//        </>
//    );
//};

//export default NoiDangBao;

//async function getNoiDangBaos(searchParams: NoiDangBaoSearch): Promise<{ data: NoiDangBaoData[], total: number }> {
//    // Mock implementation
//    return { data: [], total: 0 };
//}

//async function editNoiDangBao(id: string, data: NoiDangBaoData): Promise<void> {
//    // Mock implementation
//}

//async function createNoiDangBao(data: NoiDangBaoData): Promise<void> {
//    // Mock implementation
//}
