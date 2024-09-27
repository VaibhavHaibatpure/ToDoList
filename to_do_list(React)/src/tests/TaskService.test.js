// TaskService.test.js
import axios from 'axios';
import TaskService from './TaskService';

jest.mock('axios');

describe('TaskService', () => {
  const mockTasks = [{ id: 1, name: 'Test Task', description: 'Test Description' }];

  test('fetches all tasks successfully', async () => {
    axios.get.mockResolvedValue({ data: mockTasks });
    const response = await TaskService.getAllTasks();
    expect(response.data).toEqual(mockTasks);
  });

  test('creates a new task successfully', async () => {
    const newTask = { name: 'New Task', description: 'New Description' };
    axios.post.mockResolvedValue({ data: newTask });
    const response = await TaskService.createTask(newTask);
    expect(response.data).toEqual(newTask);
  });

  test('deletes a task successfully', async () => {
    const taskId = 1;
    axios.delete.mockResolvedValue({});
    const response = await TaskService.deleteTask(taskId);
    expect(response).toEqual({});
  });
});
