import React from 'react';
import { Menu, Button } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const items = [
  { key: "/", label: "Trang chủ" },
  {
    key: "school",
    label: "Dữ liệu toàn trường",
    children: [
      { key: "/school/topics", label: "Đề tài" },
      { key: "/school/publications", label: "Công bố" },
      { key: "/school/other-activities", label: "Hoạt động khác" },
    ],
  },
  {
    key: "personal",
    label: "Dữ liệu cá nhân",
    children: [
      { key: "/personal/topics", label: "Đề tài" },
      { key: "/personal/publications", label: "Công bố" },
      { key: "/personal/other-activities", label: "Hoạt động khác" },
    ],
  },
  { key: "/regulations", label: "Quy chế - Quy định" },
  { key: "/contact", label: "Liên hệ" },
];

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };
  
  // Tìm selectedKey dựa vào đường dẫn hiện tại
  const getSelectedKey = (pathname) => {
    if (pathname === '/') return ['/'];
    
    for (const item of items) {
      if (item.children) {
        for (const child of item.children) {
          if (pathname === child.key) return [child.key];
        }
      } else if (pathname === item.key) {
        return [item.key];
      }
    }
    
    return ['/'];
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        height: "48px",
        padding: "0 16px",
      }}
    >
      <div
        className="demo-logo"
        style={{
          color: "#1890ff",
          fontWeight: "bold",
          fontSize: "1.5rem",
          marginRight: "16px",
        }}
      >
        DHTL
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={getSelectedKey(location.pathname)}
        onClick={handleMenuClick}
        items={items}
        style={{ flex: 1, minWidth: 0, backgroundColor: "#f5f5f5" }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to="/login">
          <Button type="primary">Đăng nhập</Button>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;