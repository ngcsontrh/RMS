import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Home Page</h1>
      <p>Welcome to the SRM System. This is the home page of the application.</p>
      <div className="dashboard-summary">
        <h2>Dashboard Summary</h2>
        <p>Your recent activities and statistics will appear here.</p>
      </div>
    </div>
  );
};

export default HomePage;