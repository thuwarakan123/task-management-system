import React, { useState, useEffect } from "react";
import { Table, Button, Space, Input, message, Card, Typography, Modal, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTasks, deleteTask } from "../services/taskService.ts";
import CreateTaskModal from "../components/CreateTaskModal.tsx";
import dayjs from "dayjs";

const { Title } = Typography;

// Styles
const styles = {
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 8,
  },
  actions: {
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
  },
};

const AdminTaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getAllTasks();
      setTasks(response.data.data);
    } catch (error) {
      message.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This will permanently delete the task.",
      onOk: async () => {
        try {
          await deleteTask(taskId);
          message.success("Task deleted successfully");
          fetchTasks();
        } catch (error) {
          message.error("Failed to delete task");
        }
      },
    });
  };

  return (
    <Card style={styles.card}>
      <Title level={3}>Task Management</Title>

      <Space style={styles.actions}>
        <Input.Search
          placeholder="Search Tasks..."
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}>
          Add Task
        </Button>
      </Space>

      <Table
        dataSource={tasks.filter((task: any) => task?.taskName?.toLowerCase().includes(searchText.toLowerCase()))}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      >
        <Table.Column title="Task Name" dataIndex="taskName" />
        <Table.Column title="Assigned To" dataIndex="assignedUser" render={(user: any) => `${user?.firstName} ${user?.lastName}`} />
        <Table.Column title="Start Date" dataIndex="startDate" render={(startDate: string) => `${dayjs(startDate).format('DD MMM YYYY')}`} />
        <Table.Column title="End Date" dataIndex="endDate" render={(endDate: string) => `${dayjs(endDate).format('DD MMM YYYY')}`} />
        <Table.Column title="Status" dataIndex="status" render={(status: string) => <Tag color={status === "completed" ? "green" : "orange"}>{status}</Tag>}  />
        <Table.Column
          title="Actions"
          render={(task: any) => (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => handleEditTask(task)}>Edit</Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteTask(task._id)}>Delete</Button>
            </Space>
          )}
        />
      </Table>

      <CreateTaskModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskData={selectedTask}
        refreshTasks={fetchTasks}
      />
    </Card>
  );
};

export default AdminTaskManagement;
