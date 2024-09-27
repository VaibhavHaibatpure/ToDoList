// Taskbar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Taskbar from '../components/Taskbar';

describe('Taskbar Component', () => {
  test('renders without crashing', () => {
    const { getByText } = render(
      <Taskbar onRefreshClick={() => {}} onTaskSubmit={() => {}} />
    );
    expect(getByText('Refresh Tasks')).toBeInTheDocument();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  test('calls onTaskSubmit when Add Task is clicked', () => {
    const mockOnTaskSubmit = jest.fn();
    const { getByText } = render(
      <Taskbar onRefreshClick={() => {}} onTaskSubmit={mockOnTaskSubmit} />
    );
    fireEvent.click(getByText('Add Task'));
    expect(mockOnTaskSubmit).toHaveBeenCalled();
  });
});
