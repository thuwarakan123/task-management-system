import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, Button, message, Row, Col, Switch, Typography } from "antd";
import { createTask, updateTask } from "../services/taskService.ts";
import { getUsers } from "../services/userService.ts";
import dayjs from "dayjs";

const { Option } = Select;
const { Title, Text } = Typography;

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  taskData?: any;
  refreshTasks: () => void;
}

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


const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, onClose, taskData, refreshTasks }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
    if (taskData) {
      form.setFieldsValue({
        ...taskData,
        startDate: taskData.startDate ? dayjs(taskData.startDate) : null,
        endDate: taskData.endDate ? dayjs(taskData.endDate) : null,
        assignedUser: taskData.assignedUser._id || null,
        status: taskData.status === "completed",
      });
    } 
    else {
      form.resetFields();
    }
  }, [taskData, visible, form]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.data.filter(person => person.role === "user"));
    } 
    catch (error) {
      message.error("Failed to fetch users");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        startDate: values.startDate.toISOString(),
        endDate: values.endDate.toISOString(),
        status: values.status ? "completed" : "pending",  
      };

      console.log(values)

      if (taskData) {
        await updateTask(taskData._id, formattedValues);
        message.success("Task updated successfully");
      } else {
        await createTask(formattedValues);
        message.success("Task created successfully");
      }
      onClose();
      refreshTasks();
    } catch (error) {
      message.error("Failed to save task");
    } finally {
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
     width={600}
     style={styles.modal}
    >
      <div style={styles.header}>
        <Title level={3} style={styles.title}>{taskData ? "Edit Task" : "Add New Task"}</Title>
        <Text type="secondary">Fill in the details below to {taskData ? "update" : "create"} a task.</Text>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={styles.form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Task Name" name="taskName" rules={[{ required: true, message: "Enter task name" }]}>
              <Input placeholder="Enter task name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Assigned User" name="assignedUser" rules={[{ required: true, message: "Select a user" }]}>
              <Select placeholder="Select user">
                {users.map((user: any) => (
                  <Option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Select start date" }]}>
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: "Select end date" }]}>
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={18}>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} placeholder="Enter task description" />
              </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Completed" name="status" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        {/* <Form.Item label="Description" name="description">
          <Input.TextArea rows={2} placeholder="Enter task description" />
        </Form.Item>

        <Form.Item label="Status" name="status" valuePropName="checked">
          <Switch checkedChildren="Completed" unCheckedChildren="Pending" />
        </Form.Item> */}

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={onClose} style={{ backgroundColor: "#f5f5f5", color: "#000" }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {taskData ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
