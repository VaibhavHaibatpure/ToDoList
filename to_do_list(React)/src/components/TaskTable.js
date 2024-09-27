import React, { useState } from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

const TaskTable = ({ tasks, onEdit, onDelete }) => { // Change here
  const [activePage, setActivePage] = useState(1);
  const tasksPerPage = 15;

  // Calculate total pages required
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Get the current tasks to be displayed
  const startIndex = (activePage - 1) * tasksPerPage;
  const currentTaskBatch = tasks.slice(startIndex, startIndex + tasksPerPage);

  // Update the page number
  const switchPage = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTaskBatch.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <Button variant="warning" onClick={() => onEdit(task)}>Edit</Button> {/* Change here */}
                <Button variant="danger" onClick={() => onDelete(task)} className="ms-2">Delete</Button> {/* Change here */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <Pagination>
        <Pagination.Prev 
          onClick={() => activePage > 1 && switchPage(activePage - 1)} 
          disabled={activePage === 1} 
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === activePage} 
            onClick={() => switchPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          onClick={() => activePage < totalPages && switchPage(activePage + 1)} 
          disabled={activePage === totalPages} 
        />
      </Pagination>
    </>
  );
};

export default TaskTable;
