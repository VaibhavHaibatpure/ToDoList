// DeleteModal.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';

describe('DeleteModal Component', () => {
  const mockTask = { name: 'Test Task' };

  test('renders delete confirmation message', () => {
    const { getByText } = render(<DeleteModal task={mockTask} onClose={() => {}} onConfirm={() => {}} />);
    expect(getByText('Are you sure you want to delete the task: Test Task?')).toBeInTheDocument();
  });

  test('calls onConfirm when Yes, Delete button is clicked', () => {
    const mockOnConfirm = jest.fn();
    const { getByText } = render(<DeleteModal task={mockTask} onClose={() => {}} onConfirm={mockOnConfirm} />);
    fireEvent.click(getByText('Yes, Delete'));
    expect(mockOnConfirm).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(<DeleteModal task={mockTask} onClose={mockOnClose} onConfirm={() => {}} />);
    fireEvent.click(getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
