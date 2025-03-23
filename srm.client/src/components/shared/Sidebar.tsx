import React from 'react';
import { Menu, Layout, Flex, Typography, MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar: React.FC = () => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            key: '/',
            label: 'Trang chủ',
            onClick: () => navigate('/')
        },
        {
            key: '/toan-truong',
            label: 'Dữ liệu toàn trường',
            children: [
                {
                    key: '/toan-truong/de-tai',
                    label: 'Đề tài',
                    onClick: () => navigate('/toan-truong/de-tai')
                },
                {
                    key: '/toan-truong/cong-bo',
                    label: 'Công bố',
                    onClick: () => navigate('/toan-truong/cong-bo')
                },
                //{
                //    key: '/toan-truong/hoat-dong',
                //    label: 'Hoạt động',
                //    onClick: () => navigate('/toan-truong/hoat-dong')
                //}
            ],
        },
        ...(isAuthenticated ? [
            {
                key: '/ca-nhan',
                label: 'Dữ liệu cá nhân',
                children: [
                    {
                        key: '/ca-nhan/de-tai',
                        label: 'Đề tài',
                        onClick: () => navigate('/ca-nhan/de-tai')
                    },
                    {
                        key: '/ca-nhan/cong-bo',
                        label: 'Công bố',
                        onClick: () => navigate('/ca-nhan/cong-bo')
                    },
                    //{
                    //    key: '/ca-nhan/hoat-dong',
                    //    label: 'Hoạt động',
                    //    onClick: () => navigate('/ca-nhan/hoat-dong')
                    //}
                ],
            },
            {
                key: '/danh-muc',
                label: 'Danh mục',
                onClick: () => navigate('/danh-muc')
            },
            {
                key: '/thong-tin-ca-nhan',
                label: 'Thông tin cá nhân',
                onClick: () => navigate('/thong-tin-ca-nhan')
            },
            {
                key: '/quan-ly-nguoi-dung',
                label: 'Quản lý người dùng',
                onClick: () => navigate('/quan-ly-nguoi-dung')
            },
            //{
            //    key: '/ly-lich-khoa-hoc',
            //    label: 'Lý lịch khoa học',
            //    onClick: () => navigate('/ly-lich-khoa-hoc')
            //},
            {
                key: '/ket-qua',
                label: 'Kết quả',
                onClick: () => navigate('/ket-qua')
            },
            //{
            //    key: '/quy-dinh-tinh',
            //    label: 'Quy định tính',
            //    onClick: () => navigate('/quy-dinh-tinh')
            //},
            //{
            //    key: '/de-xuat-de-tai',
            //    label: 'Đề xuất đề tài',
            //    onClick: () => navigate('/de-xuat-de-tai')
            //},
            {
                key: '/huong-dan-su-dung',
                label: 'Hướng dẫn sử dụng',
                onClick: () => navigate('/huong-dan-su-dung')
            }
        ] : []),
        {
            key: '/quy-che',
            label: 'Quy chế - Quy định KHCN',
            onClick: () => navigate('/quy-che')
        },
        {
            key: '/lien-he',
            label: 'Liên hệ',
            onClick: () => navigate('/lien-he')
        },
    ];
    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <Flex align="center" justify="center" gap={5} style={{ height: 32, margin: 10 }}>
                <img src="/images/qlkh-logo.png" width="30" height="30" alt="logo" />
                <Typography.Text strong style={{ color: 'white', fontSize: '17px' }}>
                    CSDL KHOA HỌC
                </Typography.Text>
            </Flex>
            <Menu
                forceSubMenuRender
                theme="dark"
                mode="inline"
                items={items}
                defaultSelectedKeys={[useLocation().pathname]}
            />
        </Sider>
    );
};

export default Sidebar;