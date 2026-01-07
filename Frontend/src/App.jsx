import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All Tasks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [theme, setTheme] = useState('dark');

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    socket.on('taskUpdate', fetchTasks);
    return () => socket.off('taskUpdate');
  }, []);

  const filteredTasks = filter === 'All Tasks' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  const stats = {
    total: tasks.length,
    high: tasks.filter(t => t.priority === 'High').length,
    medium: tasks.filter(t => t.priority === 'Medium').length,
    low: tasks.filter(t => t.priority === 'Low').length
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Sidebar activeFilter={filter} setFilter={setFilter} theme={theme} toggleTheme={() => setTheme(t => t==='dark'?'light':'dark')} />
      
      <main className="main-area">
        <header className="header-row">
          <div>
            <p style={{color: 'var(--text-muted)', fontWeight: 600}}>Dashboard</p>
            <h1>Task Overview</h1>
          </div>
          <button className="add-task-btn" onClick={() => {setEditTask(null); setIsModalOpen(true)}}>
            + Add New Task
          </button>
        </header>

        {filter === 'All Tasks' && (
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-title">📊 Total Tasks</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-card" style={{borderLeft: '4px solid #ef4444'}}>
              <span className="stat-title">🔥 High Priority</span>
              <span className="stat-value">{stats.high}</span>
            </div>
            <div className="stat-card" style={{borderLeft: '4px solid #f59e0b'}}>
              <span className="stat-title">⚡ Average Priority</span>
              <span className="stat-value">{stats.medium}</span>
            </div>
            <div className="stat-card" style={{borderLeft: '4px solid #22c55e'}}>
              <span className="stat-title">✅ Low Priority</span>
              <span className="stat-value">{stats.low}</span>
            </div>
          </div>
        )}

        <h2 style={{marginBottom: '20px'}}>{filter}</h2>
        <div className="task-grid">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={() => {setEditTask(task); setIsModalOpen(true)}} />
            ))
          ) : (
            <div className="empty-state">No pending tasks</div>
          )}
        </div>

        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} editData={editTask} />
      </main>
    </div>
  );
}
export default App;