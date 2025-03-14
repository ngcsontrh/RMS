import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CapDeTai from './CapDeTai';
import LoaiHoatDong from './LoaiHoatDong';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Cấp đề tài',
        children: <CapDeTai />,
    },
    {
        key: '2',
        label: 'Đơn vị chủ trì',
        children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Tab 3',
        children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Loại Hoạt Động',
        children: <LoaiHoatDong />,
    },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;