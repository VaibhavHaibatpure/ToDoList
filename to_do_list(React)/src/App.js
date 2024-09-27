import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Taskbar from './components/Taskbar';
import TaskTable from './components/TaskTable';
import TaskDetailModal from './components/TaskDetailModal';
import DeleteModal from './components/DeleteModal';
import TaskService from './services/TaskService';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTaskList(response.data);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const addNewTask = () => {
    setCurrentTask(null);  // Reset the task form for new task creation
    setIsTaskModalVisible(true);  // Show task modal for creating new task
  };

  const saveNewTask = async (taskDetails) => {
    try {
      // Create new task by calling the TaskService
      await TaskService.createTask(taskDetails);
      // Reload the task list to show the newly created task
      loadTasks();
      // Close the task modal after saving
      setIsTaskModalVisible(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const editTask = (task) => {
    setCurrentTask(task);  // Set task to edit
    setIsTaskModalVisible(true);  // Open modal to edit the task
  };

  const deleteTaskPrompt = (task) => {
    setCurrentTask(task);  // Set current task to delete
    setIsDeleteModalVisible(true);  // Open delete confirmation modal
  };

  const confirmTaskDelete = async () => {
    try {
      // Delete the task using the TaskService
      await TaskService.deleteTask(currentTask.id);
      // Reload task list after deletion
      loadTasks();
      // Close delete confirmation modal
      setIsDeleteModalVisible(false);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      {/* Pass saveNewTask to Taskbar for creating a new task */}
      <Taskbar onRefreshClick={loadTasks} onTaskSubmit={saveNewTask} /> 
      <div className="container mt-3">
        <TaskTable tasks={taskList} onEdit={editTask} onDelete={deleteTaskPrompt} />
      </div>

      {isTaskModalVisible && (
        <TaskDetailModal
          task={currentTask}
          show={isTaskModalVisible}
          onHide={() => setIsTaskModalVisible(false)}
          onSave={saveNewTask}  // Pass saveNewTask to modal for saving task
        />
      )}

      {isDeleteModalVisible && (
        <DeleteModal
          task={currentTask}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={confirmTaskDelete}  // Confirm task deletion
        />
      )}
    </div>
  );
};

export default App;
