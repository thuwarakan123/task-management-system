import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Typography, Avatar, Dropdown, Space, Breadcrumb } from "antd";
import { UserOutlined, OrderedListOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserManagement from "./UserManagement.tsx";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const styles: any = {
  sider: { 
    background: "#001529", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between"
  },
  logoutContainer: { 
    padding: "16px",
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "0 16px", 
    background: "#fff", 
    borderBottom: "1px solid #f0f0f0" 
  },
  collapseBtn: { 
    fontSize: "16px" 
  },
  profileContainer: { 
    cursor: "pointer", 
    padding: "8px 16px", 
    borderRadius: "4px", 
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
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUsername(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  const menuItems: any = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>

      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={styles.sider}>

        <Title level={3} style={{ color: "#fff", padding: "16px", textAlign: "center" }}>
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
            User Manage
          </Menu.Item>
          <Menu.Item key="task-management" icon={<OrderedListOutlined />}>
            Task Manage
          </Menu.Item>
        </Menu>

        <div style={styles.logoutContainer}>
          <Button type="default" danger icon={<LogoutOutlined />} block onClick={handleLogout} style={{fontWeight:600}}>
            { !collapsed && "Logout" }
          </Button>
        </div>

      </Sider>

      <Layout>
        <Header style={styles.header}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={styles.collapseBtn}
            />
            <Title level={4} style={{ margin: 0 }}>Admin Dashboard</Title>
          </Space>
          <Dropdown overlay={menuItems} trigger={["click"]}>
            <Space style={styles.profileContainer}>
              <Avatar size="small" icon={<UserOutlined />} />
              <Text>{username || "Admin"}</Text>
            </Space>
          </Dropdown>
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


