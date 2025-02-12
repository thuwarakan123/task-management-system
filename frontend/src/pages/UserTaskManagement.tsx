import React, { useState, useEffect } from "react";
import { Table, Button, Tag, message, Card } from "antd";
import { getUserTasks, markTaskCompleted } from "../services/taskService.ts";
import dayjs from "dayjs";

const { Column } = Table;

const UserTaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getUserTasks();
      setTasks(response.data.data);
    } catch (error) {
      message.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (taskId: string) => {
    try {
      await markTaskCompleted(taskId);
      message.success("Task marked as completed");
      fetchTasks();
    } catch (error) {
      message.error("Failed to update task");
    }
  };

  return (
    <Card style={{ padding: 20, borderRadius: 8 }}>
      <h2>Your Tasks</h2>
      <Table dataSource={tasks} rowKey="_id" loading={loading} bordered>
        <Column title="Task Name" dataIndex="taskName" />
        <Column title="Start Date" dataIndex="startDate" render={(startDate: string) => `${dayjs(startDate).format('DD MMM YYYY')}`} />
        <Column title="End Date" dataIndex="endDate" render={(endDate: string) => `${dayjs(endDate).format('DD MMM YYYY')}`} />
        {/* <Column title="Description" dataIndex="description"/> */}
        <Column title="Status" dataIndex="status" render={(status: string) => <Tag color={status === "completed" ? "green" : "orange"}>{status}</Tag>} />
        <Column
          title="Actions"
          render={(task: any) =>
            task.status !== "completed" ? (
              <Button type="primary" onClick={() => handleMarkCompleted(task._id)}>
                Mark Completed
              </Button>
            ) : null
          }
        />
      </Table>
    </Card>
  );
};

export default UserTaskManagement;
