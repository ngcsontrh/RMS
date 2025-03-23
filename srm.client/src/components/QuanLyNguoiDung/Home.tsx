import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import QuanLyTaiKhoan from './QuanLyTaiKhoan';
import QuanLyThongTin from './QuanLyThongTin';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Thông tin người dùng',
        children: <QuanLyThongTin userData={undefined} />,
    },
    {
        key: '2',
        label: 'Quản lý tài khoản',
        children: <QuanLyTaiKhoan />,
    },
];

const QuanLyNguoiDungHome: React.FC = () => {
    return (
        <Tabs items={items} />
    )
}

export default QuanLyNguoiDungHome;
