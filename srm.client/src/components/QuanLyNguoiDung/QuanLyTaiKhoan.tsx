import { Button, Row, Col, Breadcrumb, TableProps, Table, message, Popconfirm } from 'antd';
import { CapDeTaiData } from '../../models/data';
import { useState } from 'react';
import { CapDeTaiSearch } from '../../models/search';
import { useQuery } from '@tanstack/react-query';
import { getCapDeTais, editCapDeTai, createCapDeTai } from '../../services/CapDeTaiService';
import { Pagination } from '../commons';
import UserProfile from './UserProfile'; // Import UserProfile component

interface DataType extends CapDeTaiData {
    key: string;
    stt: number;
}

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
        title: <div style={{ textAlign: 'center' }}>Danh sách tài khoản</div>,
        key: 'ten',
        dataIndex: 'ten',
    },
];

const QuanLyTaiKhoan: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [searchParams, setSearchParams] = useState<CapDeTaiSearch>({
        pageIndex: 1,
        pageSize: 10,
        ten: null,
    });
    const [selectedData, setSelectedData] = useState<CapDeTaiData | null>(null); // Dữ liệu của dòng được chọn
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false); // Trạng thái khi nhấn "Thêm mới"

    const { data: capDeTaiDatas, isLoading, error, refetch } = useQuery({
        queryKey: ['deTaiData', searchParams],
        queryFn: () => getCapDeTais(searchParams),
    });

    const dataSource: DataType[] = capDeTaiDatas?.items?.map((item, index) => ({
        ...item,
        key: item.id!.toString(),
        stt: (searchParams.pageIndex! - 1) * searchParams.pageSize! + index,
    })) || [];

    const totalItems = capDeTaiDatas?.total ?? dataSource.length;

    const handlePaginationChange = (pageIndex: number, pageSize: number) => {
        setSearchParams(prev => ({ ...prev, pageIndex, pageSize }));
    };

    const handleRowClick = (record: DataType) => {
        setSelectedData(record); // Lưu dữ liệu của dòng được chọn
        setIsCreatingNew(false); // Không phải chế độ "Thêm mới"
    };

    const handleCreateNew = () => {
        setSelectedData(null); // Xóa dữ liệu được chọn để form trống
        setIsCreatingNew(true); // Chuyển sang chế độ "Thêm mới"
    };

    const handleCancel = () => {
        setSelectedData(null); // Xóa dữ liệu được chọn
        setIsCreatingNew(false); // Thoát chế độ "Thêm mới"
    };

    const handleFinish = async (values: any) => {
        try {
            if (selectedData?.id && !isCreatingNew) {
                // Cập nhật tài khoản
                await editCapDeTai(selectedData.id, { ...selectedData, ...values });
                messageApi.success('Cập nhật thành công');
            } else {
                // Tạo mới tài khoản
                await createCapDeTai({ ...values });
                messageApi.success('Tạo mới thành công');
            }
            setSelectedData(null); // Ẩn form sau khi submit
            setIsCreatingNew(false); // Thoát chế độ "Thêm mới"
            refetch(); // Làm mới danh sách tài khoản
        } catch (err) {
            messageApi.error('Có lỗi xảy ra');
            console.error(err);
        }
    };

    if (error) return <div>{(error as Error).message}</div>;

    return (
        <>
            {contextHolder}
            <Breadcrumb style={{ marginTop: '10px' }} items={[{ title: 'Quản lý người dùng' }, { title: 'Quản lý tài khoản' }]} />
            <Row gutter={15} style={{ marginTop: '10px' }}>
                <Col span={12}>
                    <Table<DataType>
                        size="small"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        loading={isLoading}
                        rowClassName={() => 'cursor-pointer'}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),
                        })}
                    />
                    <Pagination
                        current={searchParams.pageIndex!}
                        pageSize={searchParams.pageSize!}
                        total={totalItems}
                        onChange={handlePaginationChange}
                    />
                </Col>
                <Col span={12}>
                    <Row gutter={10}>
                        <Col>
                            <Button type="primary" onClick={handleCreateNew}>Thêm mới</Button>
                        </Col>
                        {(selectedData || isCreatingNew) && (
                            <Col>
                                <Popconfirm
                                    title="Xác nhận"
                                    description="Dữ liệu sẽ không được lưu lại"
                                    onConfirm={handleCancel}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                >
                                    <Button type="primary" danger>Hủy</Button>
                                </Popconfirm>
                            </Col>
                        )}
                    </Row>
                    {/* Hiển thị form UserProfile khi có dòng được chọn hoặc đang ở chế độ "Thêm mới" */}
                    {(selectedData || isCreatingNew) && (
                        <div style={{ marginTop: '20px' }}>
                            <UserProfile
                                userData={selectedData || {}} // Truyền dữ liệu của dòng được chọn (nếu có)
                                onFinish={handleFinish} // Truyền hàm xử lý khi submit form
                            />
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default QuanLyTaiKhoan;