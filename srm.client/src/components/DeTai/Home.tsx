import React, { useEffect } from 'react';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import type { DeTaiData } from '../../models/data';
import type { DeTaiSearch } from '../../models/search';
import { useQuery } from '@tanstack/react-query';
import { getDeTais } from '../../services/DeTaiService';
import { getUserDropdown } from '../../services/UserService';
import { Loading, Pagination, Error } from '../commons';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import dayjs from 'dayjs';

interface DataType extends DeTaiData {
    key: string;
    stt: number
}

export default () => {   
    const location = useLocation();
    const { userId } = useAuthStore();
    const [searchParams, setSearchParams] = React.useState<DeTaiSearch>({
        pageIndex: 1,
        pageSize: 10,
        tacGiaId: location.pathname === '/ca-nhan/de-tai' ? Number(userId) : undefined,
    });
    const isToanTruong = location.pathname.startsWith('/toan-truong');    

    const { data: userDatas } = useQuery({
        queryKey: ['userDropdown'],
        queryFn: () => getUserDropdown()
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['deTaiData', searchParams],
        queryFn: () => getDeTais(searchParams)
    });
    useEffect(() => {
        setSearchParams({
            pageIndex: 1,
            pageSize: 10,
            tacGiaId: location.pathname === '/ca-nhan/de-tai' ? Number(userId) : undefined,
        });
    }, [location.pathname, userId]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error.message} />
    }

    const dataSource: DataType[] = data?.items
        ? data.items.map((item, index) => ({
            ...item,
            key: item.id!.toString(),
            stt: (searchParams.pageIndex! - 1) * searchParams.pageSize! + index,
        }))
        : [];

    const totalItems = data?.total ?? dataSource.length;

    const handlePaginationChange = (pageIndex: number, pageSize: number) => {
        setSearchParams({
            ...searchParams,
            pageIndex,
            pageSize,
        });
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: <div style={{ textAlign: 'center' }}>STT</div>,
            dataIndex: 'stt',
            key: 'stt',
            width: 70,
            render: (_, record) => record.stt + 1
        },
        {
            title: <div style={{ textAlign: 'center' }}>Cấp đề tài</div>,
            key: 'tenCapDeTai',
            width: 150,
            render: (_, record) => record.tenCapDeTai
        },
        {
            title: <div style={{ textAlign: 'center' }}>Tên đề tài</div>,
            key: 'ten',
            width: 300,
            render: (_, record) => record.ten
        },
        {
            title: <div style={{ textAlign: 'center' }}>Hồ sơ nghiệm thu</div>,
            key: 'hoSoNghiemThu',
            width: 300,
            render: (_, record) => <Link to={`/${record.hoSoNghiemThu}`}>Hồ sơ nghiệm thu</Link>
        },
        {
            title: <div style={{ textAlign: 'center' }}>Thời gian thực hiện</div>,
            key: 'thoiGian',
            width: 230,
            render: (_, record) => (
                <>
                    {record.ngayBatDau && record.ngayKetThuc ? (
                        <>
                            Từ {dayjs(record.ngayBatDau).format('DD/MM/YYYY')} đến {dayjs(record.ngayKetThuc).format('DD/MM/YYYY')}
                        </>
                    ) : (
                        'Chưa xác định'
                    )}
                </>
            )
        },
        {
            title: <div style={{ textAlign: 'center' }}>Chủ nhiệm</div>,
            key: 'chuNhiem',
            width: 150,
            render: (_, record) => {
                const user = userDatas?.find(u => u.id?.toString() === record.chuNhiem);

                return user ? (
                    <Button variant="outlined" color="primary">
                        <Link to={`/user/${record.chuNhiem}`} style={{ color: 'inherit' }}>
                            {user.fullName}
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outlined" color="default">
                        {record.chuNhiem}
                    </Button>
                );
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Cán bộ tham gia</div>,
            key: 'canBoThamGia',
            width: 350,
            render: (_, record) => {
                return (
                    <Flex wrap gap='small'>
                        {record.canBoThamGias?.map((id: string) => {
                            const user = userDatas?.find(u => u.id?.toString() === id);

                            return user ? (
                                <Button key={id} variant='outlined' color='primary'>
                                    <Link to={`/user/${user.id}`}>
                                        {user.fullName}
                                    </Link>
                                </Button>
                            ) : (
                                <Button key={id} variant='outlined' color='default'>
                                    {id}
                                </Button>
                            );
                        })}
                    </Flex>
                );
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
            key: 'action',
            width: 100,
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Link to={isToanTruong ? `/toan-truong/de-tai/${record.id}` : `/ca-nhan/de-tai/${record.id}`}>Chi tiết</Link>
                </div>
            ),
        },
    ];    

    return (
        <>
            <Breadcrumb
                style={{ marginTop: "10px" }}
                items={[{ title: "Đề tài" }, { title: "Danh sách" }]}
            />
            {location.pathname === '/ca-nhan/de-tai' && (
                <Flex justify="flex-end">
                    <Button
                        type="primary"
                        style={{ marginTop: "10px" }}
                    >
                        <Link to={'/de-tai/tao-moi'}>Tạo mới</Link>
                    </Button>
                </Flex>
            )}            
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                loading={isLoading}
                bordered
                style={{ marginTop: "10px" }}
                scroll={{ x: 'max-content', y: 500 }} 
            />
            <Pagination
                current={searchParams.pageIndex!}
                pageSize={searchParams.pageSize!}
                total={totalItems}
                onChange={handlePaginationChange}
            />
        </>
    );
}