import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, message, Card, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUsers, deleteUser } from "../services/userService.ts";
import CreateUserModal from "../components/CreateUserModal.tsx"; 

const { Title } = Typography;

// Styles
const styles = {
  card: { 
    background: "#fff", 
    padding: 24, 
    borderRadius: 8 
  },
  actions: { 
    marginBottom: 16, 
    display: "flex", 
    justifyContent: "space-between" 
  },
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } 
    catch (error) {
      message.error("Failed to fetch users");
    } 
    finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      message.success("User deleted successfully");
      fetchUsers();
    } 
    catch (error) {
      message.error("Failed to delete user");
    }
  };

  return (
    <Card style={styles.card}>
      <Title level={3}>User Management</Title>

      <Space style={styles.actions}>
        <Input.Search
          placeholder="Search Users..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}>
          Add User
        </Button>
      </Space>

      <Table
        dataSource={users.filter((user: any) => user?.firstName?.toLowerCase().includes(searchText.toLowerCase()))}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 3 }}
      >
        <Table.Column title="First Name" dataIndex="firstName" />
        <Table.Column title="Last Name" dataIndex="lastName" />
        <Table.Column title="Email" dataIndex="email" />
        <Table.Column title="Phone" dataIndex="mobileNumber" />
        {/* <Table.Column title="Address" dataIndex="address" /> */}
        <Table.Column title="Role" dataIndex="role" />
        <Table.Column
          title="Actions"
          render={(user: any) => (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => handleEditUser(user)}>Edit</Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
            </Space>
          )}
        />
      </Table>

      <CreateUserModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={selectedUser}
        refreshUsers={fetchUsers}
      />
    </Card>
  );
};

export default UserManagement;


