import React from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

const UserDashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
          <h2>User Dashboard</h2>
          <p>View and complete your assigned tasks.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
