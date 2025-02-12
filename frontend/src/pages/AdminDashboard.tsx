// import React, { useState } from "react";
// import { Layout, Menu } from "antd";
// import { UserOutlined, OrderedListOutlined } from "@ant-design/icons";
// import UserManagement from "./UserManagement.tsx";  // Import the User Management page

// const { Header, Content, Sider } = Layout;

// const AdminDashboard: React.FC = () => {
//   const [selectedMenu, setSelectedMenu] = useState("user-management");

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Sidebar Menu */}
//       <Sider>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[selectedMenu]}
//           onClick={({ key }) => setSelectedMenu(key)}
//         >
//           <Menu.Item key="user-management" icon={<UserOutlined />}>
//             User Management
//           </Menu.Item>
//           <Menu.Item key="task-management" icon={<OrderedListOutlined />}>
//             Task Management (Micro-Frontend)
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       {/* Content Area - Dynamically Render Pages */}
//       <Layout>
//         <Header style={{ background: "#fff", padding: 0 }} />
//         <Content style={{ margin: "16px", padding: 24, background: "#fff" }}>
//           {selectedMenu === "user-management" && <UserManagement />}
//           {selectedMenu === "task-management" && <h2>Task Management (Coming Soon)</h2>}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { UserOutlined, OrderedListOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserManagement from "./UserManagement.tsx";
import { Button } from "antd";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// Styles
const styles = {
    sider: { 
        background: "#001529"
    },
    header: { 
        display: "flex", 
        alignItems: "center", 
        padding: "0 16px", 
        background: "#fff", 
        borderBottom: "1px solid #f0f0f0" 
    },
    collapseBtn: { 
        fontSize: "16px", 
        marginRight: "16px" 
    },
    content: { 
        padding: 24, 
        background: "#f5f5f5", 
        minHeight: "calc(100vh - 64px)" 
    },
    placeholder: { 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "80vh" 
    },
};

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("user-management");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={styles.sider}>
        <Title level={4} style={{ color: "#fff", padding: "16px", textAlign: "center" }}>
          {collapsed ? "TM" : "Task Manager"}
        </Title>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{padding:"10px"}}
        >
          <Menu.Item key="user-management" icon={<UserOutlined />}>
            User
          </Menu.Item>
          <Menu.Item key="task-management" icon={<OrderedListOutlined />}>
            Task
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseBtn}
          />
          <Title level={4} style={{ margin: 0 }}>Admin Dashboard</Title>
        </Header>

        <Content style={styles.content}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenu === "user-management" ? "User Management" : "Task Management"}</Breadcrumb.Item>
          </Breadcrumb>

          {selectedMenu === "user-management" && <UserManagement />}
          {selectedMenu === "task-management" && (
            <div style={styles.placeholder}>
              <Title level={3}>Task Management (Coming Soon)</Title>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;


