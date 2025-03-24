import React, { useEffect } from 'react';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import type { TableProps } from 'antd';
import type { CongBoData } from '../../models/data';
import type { CongBoSearch } from '../../models/search';
import { useQuery } from '@tanstack/react-query';
import { getCongBos } from '../../services/CongBoService';
import { getUserDropdown } from '../../services/UserService';
import { Loading, Pagination, Error } from '../commons';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import dayjs from 'dayjs';
import { GlobalOutlined } from '@ant-design/icons';

interface DataType extends CongBoData {
    key: string;
    stt: number
}

export default () => {   
    const location = useLocation();
    const { userId } = useAuthStore();
    const [searchParams, setSearchParams] = React.useState<CongBoSearch>({
        pageIndex: 1,
        pageSize: 10
    });
    const isToanTruong = location.pathname.startsWith('/toan-truong');    

    const { data: userDatas } = useQuery({
        queryKey: ['userDropdown'],
        queryFn: () => getUserDropdown()
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['congBoData', searchParams],
        queryFn: () => getCongBos(searchParams)
    });
    useEffect(() => {
        setSearchParams({
            pageIndex: 1,
            pageSize: 10,
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
            title: <div style={{ textAlign: 'center' }}>Nơi đăng báo</div>,
            key: 'noiDangBao',
            width: 200,
            render: (_, record) => record.tenNoiDangBao
        },
        {
            title: <div style={{ textAlign: 'center' }}>Tạp chí</div>,
            key: 'tenTapChi',
            width: 250,
            render: (_, record) => record.tenTapChi
        },
        {
            title: <div style={{ textAlign: 'center' }}>Công bố</div>,
            key: 'tenCongBo',
            width: 350,
            render: (_, record) => record.ten
        },
        {
            title: <div style={{ textAlign: 'center' }}>Ngày gửi đăng</div>,
            key: 'ngayGuiDang',
            width: 150,
            render: (_, record) => dayjs(record.ngayGuiDang).format('DD/MM/YYYY')        
        },
        {
            title: <div style={{ textAlign: 'center' }}>Ngày công bố</div>,
            key: 'ngayCongBo',
            width: 150,
            render: (_, record) => dayjs(record.ngayCongBo).format('DD/MM/YYYY')
        },
        {
            title: <div style={{ textAlign: 'center' }}>Tác giả chính</div>,
            key: 'tacGiaChinh',
            width: 180,
            render: (_, record) => {
                const user = userDatas?.find(u => u.id?.toString() === record.tacGiaChinh);

                return user ? (
                    <Button variant="outlined" color="primary">
                        <Link to={`/user/${record.tacGiaChinh}`} style={{ color: 'inherit' }}>
                            {user.fullName}
                        </Link>
                    </Button>
                ) : (
                    <Button variant="outlined" color="default">
                        {record.tacGiaChinh}
                    </Button>
                );
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Bài báo</div>,
            key: 'baibao',
            width: 200,
            render: (_, record) => {
                return record.linkBaiBao ? (
                    <a
                        href={record.linkBaiBao.startsWith("http") ? record.linkBaiBao : `https://${record.linkBaiBao}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Xem bài báo <GlobalOutlined />
                    </a>
                ) : null;
            }
        },
        {
            title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
            key: 'action',
            width: 100,
            render: (_, record) => (
                <div style={{ textAlign: 'center' }}>
                    <Link to={isToanTruong ? `/toan-truong/cong-bo/${record.id}` : `/ca-nhan/cong-bo/${record.id}`}>Chi tiết</Link>
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
            {location.pathname === '/ca-nhan/cong-bo' && (
                <Flex justify="flex-end">
                    <Button
                        type="primary"
                        style={{ marginTop: "10px" }}
                    >
                        <Link to={'/cong-bo/tao-moi'}>Tạo mới</Link>
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