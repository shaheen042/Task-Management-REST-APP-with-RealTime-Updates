import React from 'react';
import axios from 'axios';

const TaskCard = ({ task, onEdit }) => {
  const deleteHandler = async () => {
    if (window.confirm("Delete this task?")) {
      await axios.delete(`http://localhost:5000/api/tasks/${task.id}`);
    }
  };

  // Logic to handle class names for colors
  const statusClass = task.status.toLowerCase().replace(/\s+/g, '-');
  const priorityClass = `p-${task.priority.toLowerCase()}`;

  return (
    <div className="task-card">
      <div className="task-content">
        <div className="task-header">
          <span className="task-title">{task.title}</span>
          <span className={`priority-pill ${priorityClass}`}>{task.priority}</span>
        </div>
        <p className="task-desc">{task.description}</p>
        <span className="task-date">📅 {task.duedate ? new Date(task.duedate).toLocaleDateString() : 'No date'}</span>
      </div>
      
      <div className="task-actions">
        {/* Colorful Status Pill */}
        <span className={`status-pill ${statusClass}`}>
          {task.status}
        </span>
        
        <div className="btn-group">
          <button className="mini-btn" onClick={onEdit}>✏️</button>
          <button className="mini-btn delete" onClick={deleteHandler}>🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;