// TaskDetailModal.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskDetailModal from '../components/TaskDetailModal';

describe('TaskDetailModal Component', () => {
  const mockTask = { name: 'Test Task', description: 'Test Description' };

  test('renders the task details correctly', () => {
    const { getByDisplayValue } = render(<TaskDetailModal task={mockTask} show={true} onSave={() => {}} onHide={() => {}} />);
    expect(getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(getByDisplayValue('Test Description')).toBeInTheDocument();
  });

  test('calls onSave when Save button is clicked', () => {
    const mockOnSave = jest.fn();
    const { getByText } = render(<TaskDetailModal task={mockTask} show={true} onSave={mockOnSave} onHide={() => {}} />);
    fireEvent.click(getByText('Save'));
    expect(mockOnSave).toHaveBeenCalled();
  });

  test('calls onHide when Cancel button is clicked', () => {
    const mockOnHide = jest.fn();
    const { getByText } = render(<TaskDetailModal task={mockTask} show={true} onSave={() => {}} onHide={mockOnHide} />);
    fireEvent.click(getByText('Cancel'));
    expect(mockOnHide).toHaveBeenCalled();
  });
});
