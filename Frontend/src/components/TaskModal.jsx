import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose, editData }) => {
  const [formData, setFormData] = useState({ 
    title: '', description: '', status: 'To Do', priority: 'Medium', duedate: '' 
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({ title: '', description: '', status: 'To Do', priority: 'Medium', duedate: '' });
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) await axios.patch(`http://localhost:5000/api/tasks/${editData.id}`, formData);
    else await axios.post('http://localhost:5000/api/tasks', formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{marginBottom: '20px'}}>{editData ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Due Date 📅</label>
            <input type="date" value={formData.duedate ? formData.duedate.split('T')[0] : ''} onChange={e => setFormData({...formData, duedate: e.target.value})} />
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px'}}>
            <button type="button" onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}>Cancel</button>
            <button type="submit" className="btn-primary" style={{background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;