// TaskTable.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskTable from '../components/TaskTable';

describe('TaskTable Component', () => {
  const mockTasks = [
    { id: 1, name: 'Task 1', description: 'Description 1' },
    { id: 2, name: 'Task 2', description: 'Description 2' },
  ];

  test('renders tasks correctly', () => {
    const { getByText } = render(<TaskTable tasks={mockTasks} onEdit={() => {}} onDelete={() => {}} />);
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
  });

  test('calls onEdit when Edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    const { getAllByText } = render(<TaskTable tasks={mockTasks} onEdit={mockOnEdit} onDelete={() => {}} />);
    fireEvent.click(getAllByText('Edit')[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  test('calls onDelete when Delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    const { getAllByText } = render(<TaskTable tasks={mockTasks} onEdit={() => {}} onDelete={mockOnDelete} />);
    fireEvent.click(getAllByText('Delete')[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[0]);
  });
});
