import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CapDeTai from './CapDeTai';
import LoaiHoatDong from './LoaiHoatDong';
import DonViChuTri from './DonViChuTri';
import DonVi from './DonVi';
import NoiDangBao from './NoiDangBao';
import ThanhQua from './ThanhQua';

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Cấp đề tài',
        children: <CapDeTai />,
    },
    {
        key: '2',
        label: 'Đơn vị chủ trì',
        children: <DonViChuTri />,
    },
    {
        key: '3',
        label: 'Loại Hoạt Động',
        children: <LoaiHoatDong />,
    },
    {
        key: '4',
        label: 'Đơn vị',
        children: <DonVi />,
    },
    {
        key: '5',
        label: 'Nơi đăng báo',
        children: <NoiDangBao />,
    },
    {
        key: '6',
        label: 'Thành quả',
        children: <ThanhQua />,
    },
];

const DanhMucHome: React.FC = () => {
    return (
        <Tabs items={items}  />
    )
}

export default DanhMucHome;