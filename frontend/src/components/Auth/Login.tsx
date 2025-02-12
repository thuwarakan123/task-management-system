import React, { useState } from "react";
import { Form, Input, Button, Card, Checkbox, Typography, message, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService.ts";

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

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await login(values.email, values.password);
      const role = response.data.user.role;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);
      message.success("Login successful!");
      // navigate("/dashboard");

      if (role === "admin") {
        navigate("/admin-dashboard");
      } 
      else {
        navigate("/user-dashboard");
      }

    } 
    catch (error) {
      message.error("Invalid email or password");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Welcome Back</Title>

        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
          Please login to your account
        </Text>
        
        <Form layout="vertical" onFinish={onFinish}> 
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ display: "block", textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;

