import React, { useState } from 'react';
import { Button, Navbar, Modal, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Api from '../services/TaskService'; // Ensure the correct path to your API service

const Taskbar = ({ onRefreshClick, onTaskSubmit }) => {
  // State to control the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // State to hold task details
  const [taskDetails, setTaskDetails] = useState({
    assignedTo: '',
    status: 'NOT_STARTED', // Set default status to NOT_STARTED
    dueDate: '',
    priority: 'LOW', // Set default priority to LOW
    comments: '',
  });

  // Function to open the modal for creating a new task
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close the modal and reset form fields
  const closeModal = () => {
    setIsModalVisible(false);
    resetForm(); // Reset form fields
  };

  // Function to reset the form fields
  const resetForm = () => {
    setTaskDetails({
      assignedTo: '',
      status: 'NOT_STARTED',
      dueDate: '',
      priority: 'LOW',
      comments: '',
    });
  };

  // Function for form input changes
  const updateInput = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value }); // Update the state with input values
  };

  // Function to submit the form and create a new task
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      console.log("Sending Data: " + JSON.stringify(taskDetails)); // Log the task details being sent
      await onTaskSubmit(taskDetails); // Pass the task details to the parent component
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error creating task:", error); // Log any errors
    }
  };

  return (
    <>
      {/* Navigation bar containing task options */}
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand>
          <i className="bi bi-list-ul"></i> Tasks
        </Navbar.Brand>
        <div>
          {/* Button to create a new task */}
          <Button variant="primary" onClick={showModal}>New Task</Button>
          {/* Button to refresh task list */}
          <Button variant="secondary" onClick={onRefreshClick} className="ms-2">Refresh</Button>
        </div>
      </Navbar>

      {/* Modal for creating a new task */}
      <Modal show={isModalVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            {/* Input field for the person the task is assigned to */}
            <Form.Group className="mb-3">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                name="assignedTo"
                value={taskDetails.assignedTo}
                onChange={updateInput}
                required
              />
            </Form.Group>

            {/* Dropdown for selecting task status */}
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={taskDetails.status}
                onChange={updateInput}
                required
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </Form.Select>
            </Form.Group>

            {/* Input field for the task's due date */}
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={taskDetails.dueDate}
                onChange={updateInput}
                required
              />
            </Form.Group>

            {/* Dropdown for selecting task priority */}
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select
                name="priority"
                value={taskDetails.priority}
                onChange={updateInput}
                required
              >
                <option value="LOW">Low</option>
                <option value="NORMAL">Normal</option>
                <option value="HIGH">High</option>
              </Form.Select>
            </Form.Group>

            {/* Textarea for any additional comments about the task */}
            <Form.Group className="mb-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                value={taskDetails.comments}
                onChange={updateInput}
                required
              />
            </Form.Group>

            {/* Submit button to add the task */}
            <Button variant="primary" type="submit">Add Task</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Taskbar;
