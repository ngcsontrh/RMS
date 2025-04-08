import React, { ReactNode } from 'react';
import { Breadcrumb, Layout, Menu, ConfigProvider, theme } from 'antd';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, HomeOutlined, LoginOutlined, DashboardOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = Layout;

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
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Generate main menu items
  const mainMenuItems: MenuItem[] = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
  ];
  
  // Create separate arrays for left and right menu items
  const rightMenuItems: MenuItem[] = [];
  
  // Add user-related menu items if authenticated
  if (isAuthenticated && user) {
    // Add Admin Dashboard link if user has admin role
    if (user.roles && user.roles.some(role => role.toLowerCase() === 'admin')) {
      mainMenuItems.push({
        key: '/admin/dashboard',
        label: 'Admin Dashboard',
        icon: <DashboardOutlined />,
      });
    }
    
    rightMenuItems.push(
      { 
        key: '/profile', 
        label: user.username, 
        icon: <UserOutlined />,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: () => {
          logout();
          navigate('/login');
        }
      }
    );
  } else {
    rightMenuItems.push({ 
      key: '/login', 
      label: 'Login',
      icon: <LoginOutlined />
    });
  }
  
  // Handle menu click
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const menuItem = [...mainMenuItems, ...rightMenuItems].find(item => item.key === key);
    if (menuItem?.onClick) {
      menuItem.onClick();
    } else if (key) {
      navigate(key);
    }
  };
  
  // Convert our custom menu items to Antd menu items
  const leftMenuItems: MenuProps['items'] = mainMenuItems.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));

  const rightAntdMenuItems: MenuProps['items'] = rightMenuItems.map(item => ({
    key: item.key,
    label: item.label,
    icon: item.icon
  }));
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x);
    const breadcrumbItems = [
      { 
        key: 'home', 
        title: <a onClick={() => navigate('/')}>Home</a> 
      }
    ];
    
    let breadcrumbPath = '';
    
    paths.forEach((path, index) => {
      breadcrumbPath += `/${path}`;
      const pathTitle = path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbItems.push({
        key: path,
        title: index === paths.length - 1 
          ? <span>{pathTitle}</span>
          : <a onClick={() => navigate(breadcrumbPath)}>{pathTitle}</a>
      });
    });
    
    return breadcrumbItems;
  };

  return (
    <ConfigProvider
      theme={{
        token: azureTokens,
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div 
            className="logo" 
            style={{ 
              color: 'white', 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginRight: '24px'
            }}
            onClick={() => navigate('/')}
          >
            SRM System
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={leftMenuItems}
            style={{ flex: 1, minWidth: 0 }}
            onClick={handleMenuClick}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={rightAntdMenuItems}
            style={{ 
              minWidth: '100px', 
              display: 'flex', 
              justifyContent: 'flex-end' 
            }}
            onClick={handleMenuClick}
          />
        </Header>
        <Content style={{ padding: '0 48px', backgroundColor: azureTokens.colorBgLayout }}>
          <Breadcrumb 
            style={{ margin: '16px 0' }}
            items={generateBreadcrumbs()}
          />
          <div
            style={{
              background: '#fff',
              minHeight: 280,
              padding: 24,
              borderRadius: 8,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor: azureTokens.colorBgLayout }}>
          SRM System ©{new Date().getFullYear()} Created by Your Organization
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;