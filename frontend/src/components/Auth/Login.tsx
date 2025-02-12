import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Tabs } from "antd";
import { MailOutlined, LockOutlined, KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login, verifyOTP } from "../../services/authService.ts";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
    width: 400,
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tabKey, setTabKey] = useState("password");
  const navigate = useNavigate();

  const handleNormalLogin = async (values: any) => {
    try {
      setLoading(true);
      const response = await login(values.email, values.password);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", `${response.data.user.firstName} ${response.data.user.lastName}`);
      localStorage.setItem("id", response.data.user._id);

      message.success("Login successful!");
      navigate("/dashboard");
    } 
    catch (error) {
      message.error("Invalid email or password");
    } 
    finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (values: any) => {
    try {
      setLoading(true);
      const response = await verifyOTP(values.email, values.otp);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("name", `${response.data.user.firstName} ${response.data.user.lastName}`);
      localStorage.setItem("id", response.data.user._id);

      message.success("Login successful!");
      navigate("/update-password");
    } 
    catch (error) {
      message.error("Invalid OTP");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={{ textAlign: "center" }}>Welcome Back</Title>

        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
          Please login to your account
        </Text>

        <Tabs defaultActiveKey="password" onChange={setTabKey}>
          {/* <TabPane tab="Login with Password" key="password">
            <Form layout="vertical" onFinish={handleNormalLogin}>
              <Form.Item
                label="Email"
                rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Enter a valid email address" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane> */}
          <TabPane tab="Login with Password" key="password">
            <Form layout="vertical" onFinish={handleNormalLogin}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email address" }
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

              <Form.Item style={{paddingTop: "16px"}}>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Login with OTP" key="otp">
            <Form layout="vertical" onFinish={handleVerifyOTP}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Enter a valid email address" }]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="OTP"
                name="otp"
                rules={[{ required: true, message: "Please enter the OTP sent to your email" }]}
              >
                <Input prefix={<KeyOutlined />} placeholder="Enter OTP" />
              </Form.Item>

              <Form.Item style={{paddingTop: "16px"}}>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Verify OTP & Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;



