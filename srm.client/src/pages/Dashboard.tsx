// filepath: e:\SRM\srm.client\src\pages\Dashboard.tsx
import React from 'react';
import AdminDashboard from './AdminDashboard';

// Public dashboard component - uses the same dashboard component as admin
const Dashboard: React.FC = () => {
  return <AdminDashboard />;
};

export default Dashboard;