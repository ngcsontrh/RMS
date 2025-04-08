import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Trang chủ</h1>
      <p>Chào mừng đến với Hệ thống SRM. Đây là trang chủ của ứng dụng.</p>
      <div className="dashboard-summary">
        <h2>Tổng quan bảng điều khiển</h2>
        <p>Các hoạt động gần đây và thống kê của bạn sẽ hiển thị ở đây.</p>
      </div>
    </div>
  );
};

export default HomePage;