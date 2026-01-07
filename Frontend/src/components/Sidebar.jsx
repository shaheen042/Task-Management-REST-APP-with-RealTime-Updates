import React from 'react';

const Sidebar = ({ activeFilter, setFilter, theme, toggleTheme }) => {
  const menuItems = [
    { id: 'All Tasks', icon: '📋' },
    { id: 'To Do', icon: '⭕' },
    { id: 'In Progress', icon: '🔵' },
    { id: 'Completed', icon: '✅' }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">📂 Task Manager</div>
      
      <div className="menu-items">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className={`filter-item ${activeFilter === item.id ? 'active' : ''}`}
            onClick={() => setFilter(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.id}
          </div>
        ))}
      </div>

      {/* This is now pushed to the bottom */}
      <div className="sidebar-footer">
        <div className="filter-item theme-toggle-btn" onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;