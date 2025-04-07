import React from "react";
import { Breadcrumb, Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import AppHeader from "./components/AppHeader";
const { Content, Footer } = Layout;

const AppContent = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <AppHeader />
      <Content style={{ padding: "0 24px" }}>
        <div style={{ margin: "16px 0" }}>
          <AppRouter />
        </div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "#fff", padding: "12px 0", height: "40px" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

const App = () => {  
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
