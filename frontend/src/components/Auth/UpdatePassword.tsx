import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../services/userService.ts";

const { Title, Text } = Typography;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: 400,
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const UpdatePassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const id = localStorage.getItem("id") || '';
    try {
      setLoading(true);
      await updateUser(id, {password});
      message.success("Password updated successfully! Please login.");
      navigate("/dashboard");
    } 
    catch (error) {
      message.error("Failed to update password");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Set Your Password</Title>
        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
          Enter a new password before accessing your account.
        </Text>

        <Form layout="vertical" onFinish={handleUpdatePassword}>
          <Form.Item
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password" }, { min: 6, message: "Password must be at least 6 characters" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdatePassword;
