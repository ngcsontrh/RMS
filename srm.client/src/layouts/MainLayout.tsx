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
  HomeOutlined, 
  LoginOutlined, 
  DashboardOutlined,
  LogoutOutlined,
  FileOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

// Define azure color tokens
const azureTokens = {
  colorPrimary: '#0078D4', // Azure blue
  colorLink: '#0078D4',
  colorLinkHover: '#106EBE',
  colorBgLayout: '#f0f2f5', // Light gray background
};

interface MainLayoutProps {
  children: ReactNode;
}

// Define MenuItem type for our menu
type MenuItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: MenuItem[];
  type?: 'divider' | 'group';
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Generate sidebar menu items
  const sidebarMenuItems: MenuItem[] = [
    { 
      key: '/', 
      label: 'Trang chủ', 
      icon: <HomeOutlined /> 
    },
    {
      key: 'research',
      label: 'Nghiên cứu',
      icon: <BookOutlined />,
      children: [
        {
          key: '/detai',
          label: 'Đề tài nghiên cứu',
          icon: <FileOutlined />
        },
        {
          key: '/congbo',
          label: 'Công bố khoa học',
          icon: <FileOutlined />
        },
        {
          key: '/hoatdong',
          label: 'Hoạt động nghiên cứu',
          icon: <FileOutlined />
        }
      ]
    }
  ];
  
  // Add Admin Dashboard link if user has admin role
  if (isAuthenticated && user && user.roles && user.roles.some(role => role.toLowerCase() === 'admin')) {
    sidebarMenuItems.push({
      key: '/admin/dashboard',
      label: 'Bảng điều khiển Admin',
      icon: <DashboardOutlined />,
    });
  }
  
  // Adding a separator and logout for authenticated users
  if (isAuthenticated) {
    sidebarMenuItems.push(
      {
        key: 'divider',
        label: '',
        type: 'divider'
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        icon: <LogoutOutlined />,
      }
    );
  } else {
    // Add login menu item if not authenticated
    sidebarMenuItems.push(
      {
        key: 'divider',
        label: '',
        type: 'divider'
      },
      { 
        key: '/login', 
        label: 'Đăng nhập',
        icon: <LoginOutlined />
      }
    );
  }
  
  // Handle menu click
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key !== 'divider' && !key.includes('group')) {
      navigate(key);
    }
  };
  
  // Convert our custom menu items to Antd menu items recursively
  const convertMenuItems = (items: MenuItem[]): MenuProps['items'] => {
    return items.map(item => {
      if (item.type === 'divider') {
        return {
          type: 'divider',
          key: item.key
        };
      }
      
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
        key: 'home', 
        title: <a onClick={() => navigate('/')}>Trang chủ</a> 
      }
    ];
    
    let breadcrumbPath = '';
    
    // Map of path segments to Vietnamese titles
    const pathTitles: Record<string, string> = {
      'detai': 'Đề tài',
      'congbo': 'Công bố',
      'hoatdong': 'Hoạt động',
      'profile': 'Hồ sơ',
      'contact': 'Liên hệ',
      'login': 'Đăng nhập',
      'create': 'Tạo mới',
      'edit': 'Chỉnh sửa',
      'admin': 'Quản trị'
    };
    
    paths.forEach((path, index) => {
      breadcrumbPath += `/${path}`;
      const pathTitle = pathTitles[path] || (path.charAt(0).toUpperCase() + path.slice(1));
      breadcrumbItems.push({
        key: path,
        title: index === paths.length - 1 
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
        token: azureTokens,
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
            className="logo" 
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
              alt="SRM Logo" 
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
                SRM System
              </span>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={collapsed ? [] : ['research', 'resources']}
            items={convertMenuItems(sidebarMenuItems)}
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
            {isAuthenticated && user ? (
              <Dropdown menu={userMenu} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar 
                    style={{ backgroundColor: '#0078D4' }} 
                    icon={<UserOutlined />}
                  />
                  <span>{user.username}</span>
                </Space>
              </Dropdown>
            ) : null}
          </Header>
          <Content style={{ 
            margin: '24px 16px', 
            padding: 24, 
            backgroundColor: azureTokens.colorBgLayout, 
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
          <Footer style={{ textAlign: 'center', backgroundColor: azureTokens.colorBgLayout }}>
            SRM System ©{new Date().getFullYear()} Created by Your Organization
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;