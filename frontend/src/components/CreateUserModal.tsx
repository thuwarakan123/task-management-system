import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, Row, Col, message, Typography } from "antd";
import { createUser, updateUser } from "../services/userService.ts";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { sendOTP } from "../services/authService.ts";

const { Option } = Select;
const { Title, Text } = Typography;

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  userData?: any;  
  refreshUsers: () => void;
}

// Styles
const styles: any = {
  modal: {
    borderRadius: "8px",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "8px",
  },
  form: {
    padding: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    borderRadius: "6px",
    width: "100%"
  },
  submitButton: {
    backgroundColor: "#1890ff",
    borderRadius: "6px",
  },
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ visible, onClose, userData, refreshUsers }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
      setPhoneNumber(userData.mobileNumber || "");
    } 
    else {
      form.resetFields();
      setPhoneNumber("");
    }
  }, [userData, visible, form]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const userValues = { ...values, mobileNumber: phoneNumber };

    if (!phoneNumber || phoneNumber.length < 10) {
      message.error("Please enter a valid mobile number with country code.");
      return;
    }

    try {
      
      if (userData) {
        await updateUser(userData._id, userValues);
        message.success("User updated successfully");

        await sendOTP(userValues.email);
        message.success(`OTP sent to ${userValues.email}`);
      } 
      else {
        await createUser(userValues);
        message.success("User created successfully");
      }
      onClose();
      refreshUsers();
    } 
    catch (error) {
      if(userData){
        message.error("Failed to updated user : " + error?.response?.data.message || " ");
      }
      else{
        message.error("Failed to created user : " + error?.response?.data.message || " ");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={650}
      style={styles.modal}
    >
      <div style={styles.header}>
        <Title level={3} style={styles.title}>{userData ? "Edit User" : "Add New User"}</Title>
        <Text type="secondary">Fill in the details below to {userData ? "update" : "create"} a user.</Text>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} style={styles.form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Enter first name" }]}>
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Enter last name" }]}>
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[
              { required: true, message: "Enter email" },
              { type: "email", message: "Enter a valid email" }
            ]}>
              <Input placeholder="johndoe@example.com" />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* <Form.Item label="Mobile Number" name="mobileNumber" rules={[
              { required: true, message: "Enter mobile number" },
              { pattern: /^[0-9]{10,15}$/, message: "Enter a valid mobile number" },
            ]}>
              <Input placeholder="+1234567890" />
            </Form.Item> */}
            <Form.Item label="Mobile Number" required>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                inputStyle={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: "Enter address" }]}>
              <Input placeholder="74, Buckingham Road, London" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: "Select role" }]}>
              <Select placeholder="Select a role">
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {!userData && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Enter password" }]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Form.Item >
          <div style={styles.buttonContainer}>
            <div>
              <Button type="default" onClick={onClose} style={styles.cancelButton}>
                Cancel
              </Button>
            </div>
            <div>
              <Button type="primary" htmlType="submit" loading={loading} style={styles.submitButton}>
                {userData ? "Update User" : "Create User"}
              </Button>
            </div>
          </div>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateUserModal;

