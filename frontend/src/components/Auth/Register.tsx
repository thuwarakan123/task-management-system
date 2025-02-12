import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Space, Row, Col } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService.ts";

const { Title, Text } = Typography;

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: 600,
    //padding: 10,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await register(values);
      message.success("Registration successful! Please login.");
      navigate("/");
    } 
    catch (error) {
      message.error("Registration failed. Please try again.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Create an Account</Title>

        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
          Fill in the details below to register
        </Text>

        <Form layout="vertical" onFinish={onFinish}>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email address" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                  { required: true, message: "Please enter your mobile number" },
                  { pattern: /^[0-9]{10,15}$/, message: "Enter a valid mobile number" },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter mobile number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
               label="Address"
               name="address"
               rules={[{ required: true, message: "Please enter your address" }]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
               label="Password"
               name="password"
               rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters long" },
               ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{marginTop:"8px"}}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Text style={{ display: "block", textAlign: "center" }}>
          Already have an account? <Link to="/">Login here</Link>
        </Text>

      </Card>
    </div>
  );
};

export default Register;


