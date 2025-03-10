import React from 'react';
import { Breadcrumb, Button, Flex, Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { TableProps } from 'antd';
import type { DeTaiData } from '../../models/data';
import type { DeTaiSearch } from '../../models/search';
import { useQuery } from '@tanstack/react-query';
import { getDeTais } from '../../services/DeTaiService';
import { faUser, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Pagination } from '../commons';
import { Link } from 'react-router-dom';

interface DataType extends DeTaiData {
    key: string;
    stt: number
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: <div style={{ textAlign: 'center' }}>STT</div>,
        dataIndex: 'stt',
        key: 'stt',
        width: '5%',
        render: (_, record) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>{record.stt + 1}</div>
            </div>
        )
    },
    {
        title: <div style={{ textAlign: 'center' }}>Thông tin đề tài</div>,
        key: 'info',
        render: (_, record) => (
            <>
                <h2>{`${record.ten} - ${record.maSo}`}</h2>
                <ul style={{ listStyleType: 'none' }}>
                    <li><FontAwesomeIcon icon={faBookmark} /> {record.mucTieu}</li>
                    <li><FontAwesomeIcon icon={faUser} /> {record.chuNhiem?.ten}</li>
                </ul>
            </>
        ),
    },
    {
        title: <div style={{ textAlign: 'center' }}>Thao tác</div>,
        key: 'action',
        width: '10%',
        render: (_, record) => (
            <div style={{ textAlign: 'center' }}>
                <Link to={`/de-tai/${record.id}`}>Chi tiết</Link>
            </div>
        ),
    },
];

export default () => {
    const [searchParams, setSearchParams] = React.useState<DeTaiSearch>({
        pageIndex: 1,
        pageSize: 10,
        ten: null,
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['deTaiData', searchParams],
        queryFn: () => getDeTais(searchParams)
    });

    const dataSource: DataType[] = data?.data
        ? data.data.map((item, index) => ({
            ...item,
            key: item.id!.toString(),
            stt: (searchParams.pageIndex! * searchParams.pageSize! + index + 1),
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

    if (error) return <div>{(error as Error).message}</div>;

    return (
        <>
            <Breadcrumb
                style={{ marginTop: "10px" }}
                items={[{ title: "Đề tài" }, { title: "Danh sách" }]}
            />
            <Flex justify="flex-end">
                <Button
                    type="primary"
                    style={{ marginTop: "10px" }}
                >
                    <Link to={'/de-tai/tao-moi'}>Tạo mới</Link>
                </Button>
            </Flex>
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                loading={isLoading}
                style={{ marginTop: "10px" }}
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