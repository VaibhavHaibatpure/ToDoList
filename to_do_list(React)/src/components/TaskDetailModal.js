import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskDetailModal = ({ task, show, onHide, onSave }) => {
  // State to manage the task being edited
  const [editedTask, setEditedTask] = useState({
    assignedTo: '',
    status: 'NOT_STARTED',
    dueDate: '',
    priority: 'LOW',
    comments: '',
  }); // Default values

  // Update the editedTask state when the task prop changes
  useEffect(() => {
    if (task) {
      setEditedTask(task);
    } else {
      // Reset to default if task is null
      setEditedTask({
        assignedTo: '',
        status: 'NOT_STARTED',
        dueDate: '',
        priority: 'LOW',
        comments: '',
      });
    }
  }, [task]);

  // Handle form field changes and update the corresponding field in the editedTask state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Save the edited task and close the modal
  const handleSave = () => {
    onSave(editedTask); // Trigger the save function passed via props
    onHide(); // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Input field for "Assigned To" */}
          <Form.Group controlId="assignedTo">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={editedTask.assignedTo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Dropdown for selecting task status */}
          <Form.Group controlId="status" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={editedTask.status}
              onChange={handleChange}
              required
            >
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Form.Select>
          </Form.Group>

          {/* Input field for the due date */}
          <Form.Group controlId="dueDate" className="mt-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Dropdown for selecting task priority */}
          <Form.Group controlId="priority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              required
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
            </Form.Select>
          </Form.Group>

          {/* Textarea for additional comments */}
          <Form.Group controlId="comments" className="mt-3">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={editedTask.comments}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Modal Footer with Close and Save buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;
