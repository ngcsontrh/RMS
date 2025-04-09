import React, { ReactNode, useState } from 'react';
import { 
  Layout, 
  Menu, 
  ConfigProvider, 
  theme, 
  Breadcrumb, 
  Avatar, 
  Dropdown, 
  Button, 
  Space 
} from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  DashboardOutlined, 
  SettingOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  LogoutOutlined, 
  BookOutlined,
  ProjectOutlined,
  BuildOutlined,
  BarsOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

// Define admin theme color tokens - using the azure theme with some admin-specific adjustments
const adminTokens = {
  colorPrimary: '#0078D4', // Azure blue
  colorLink: '#0078D4',
  colorLinkHover: '#106EBE',
  colorBgLayout: '#f0f2f5', // Light gray background
};

interface AdminLayoutProps {
  children: ReactNode;
}

type MenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'divider' | 'group';
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Admin menu items
  const adminMenuItems: MenuItem[] = [
    {
      key: '/admin/dashboard',
      label: 'Bảng điều khiển',
      icon: <DashboardOutlined />
    },
    {
      key: 'research',
      label: 'Quản lý Nghiên cứu',
      icon: <BookOutlined />,
      children: [
        {
          key: '/admin/detai', 
          label: 'Đề tài nghiên cứu',
          icon: <ProjectOutlined />
        },
        {
          key: '/admin/capdetai',
          label: 'Cấp đề tài',
          icon: <BarsOutlined />
        },
        {
          key: '/admin/donvichutri',
          label: 'Đơn vị chủ trì',
          icon: <ApartmentOutlined />
        },
        {
          key: '/admin/thanhqua',
          label: 'Thành quả',
          icon: <FileTextOutlined />
        },
        {
          key: '/admin/loaihoatdong',
          label: 'Loại hoạt động',
          icon: <BarsOutlined />
        },
        {
          key: '/admin/hoatdong',
          label: 'Hoạt động',
          icon: <ProjectOutlined />
        }
      ]
    },
    {
      key: 'publications',
      label: 'Quản lý Công bố',
      icon: <FileTextOutlined />,
      children: [
        {
          key: '/admin/congbo',
          label: 'Công bố khoa học',
        },
        {
          key: '/admin/noidangbao',
          label: 'Nơi đăng báo',
        }
      ]
    },
    {
      key: 'system',
      label: 'Quản lý Hệ thống',
      icon: <SettingOutlined />,
      children: [
        {
          key: '/admin/users',
          label: 'Quản lý Người dùng',
          icon: <TeamOutlined />
        },
        {
          key: '/admin/roles',
          label: 'Quản lý Vai trò',
          icon: <BuildOutlined />
        },
        {
          key: '/admin/donvi',
          label: 'Quản lý Đơn vị',
          icon: <ApartmentOutlined />
        }
      ]
    },
    // Adding a separator before logout
    {
      key: 'divider',
      label: '',
      type: 'divider'
    },
    // Adding the logout menu item
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
    }
  ];

  // Handle menu click
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key !== 'divider') {
      navigate(key);
    }
  };

  // Convert our custom menu items to Antd menu items recursively
  const convertMenuItems = (items: MenuItem[]): MenuProps['items'] => {
    return items.map(item => {
      if (item.children) {
        return {
          key: item.key,
          label: item.label,
          icon: item.icon,
          children: convertMenuItems(item.children)
        };
      }
      return {
        key: item.key,
        label: item.label,
        icon: item.icon
      };
    });
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x);
    const breadcrumbItems = [
      { 
        key: 'admin', 
        title: <a onClick={() => navigate('/admin/dashboard')}>Quản trị</a> 
      }
    ];
    
    let breadcrumbPath = '/admin';
    
    // Map of path segments to Vietnamese titles
    const pathTitles: Record<string, string> = {
      'dashboard': 'Bảng điều khiển',
      'users': 'Người dùng',
      'roles': 'Vai trò',
      'detai': 'Đề tài',
      'capdetai': 'Cấp đề tài',
      'donvichutri': 'Đơn vị chủ trì',
      'thanhqua': 'Thành quả',
      'congbo': 'Công bố',
      'noidangbao': 'Nơi đăng báo',
      'donvi': 'Đơn vị',
      'loaihoatdong': 'Loại hoạt động',
      'hoatdong': 'Hoạt động',
      'settings': 'Cài đặt'
    };
    
    paths.slice(1).forEach((path, index) => {
      breadcrumbPath += `/${path}`;
      const pathTitle = pathTitles[path] || (path.charAt(0).toUpperCase() + path.slice(1));
      breadcrumbItems.push({
        key: path,
        title: index === paths.length - 2 
          ? <span>{pathTitle}</span>
          : <a onClick={() => navigate(breadcrumbPath)}>{pathTitle}</a>
      });
    });
    
    return breadcrumbItems;
  };

  // User dropdown menu
  const userMenu: MenuProps = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Hồ sơ',
        onClick: () => navigate('/profile')
      }
    ]
  };

  return (
    <ConfigProvider
      theme={{
        token: adminTokens,
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          width={260}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000
          }}
        >
          <div 
            className="admin-logo" 
            style={{ 
              margin: '16px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              overflow: 'hidden'
            }}
          >
            <img 
              src="/vite.svg" 
              alt="Admin Logo" 
              style={{ 
                height: '32px',
                marginRight: collapsed ? '0' : '8px'
              }} 
            />
            {!collapsed && (
              <span style={{ 
                color: 'white', 
                fontSize: '18px', 
                fontWeight: 'bold' 
              }}>
                SRM Admin
              </span>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={collapsed ? [] : ['research', 'publications', 'system']}
            items={convertMenuItems(adminMenuItems)}
            onClick={handleMenuClick}
            style={{ borderRight: 0 }}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: 'margin-left 0.2s' }}>
          <Header style={{ 
            padding: '0 24px', 
            background: '#fff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,21,41,.08)',
            zIndex: 999
          }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Space size={16}>
              <Dropdown menu={userMenu} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar 
                    style={{ backgroundColor: '#0078D4' }} 
                    icon={<UserOutlined />}
                  />
                  <span>{user?.username || 'Admin'}</span>
                </Space>
              </Dropdown>
            </Space>
          </Header>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            backgroundColor: adminTokens.colorBgLayout, 
            borderRadius: 8,
            minHeight: 280
          }}>
            <Breadcrumb 
              style={{ marginBottom: 16 }}
              items={generateBreadcrumbs()}
            />
            <div
              style={{
                background: '#fff',
                padding: 24,
                borderRadius: 8,
                minHeight: 'calc(100vh - 200px)',
                boxShadow: '0 1px 4px rgba(0,21,41,.08)',
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: adminTokens.colorBgLayout }}>
            SRM Admin ©{new Date().getFullYear()} Created by Your Organization
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;