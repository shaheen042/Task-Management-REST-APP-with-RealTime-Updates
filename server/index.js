const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
    cors: { origin: "http://localhost:5173" } 
});

// Postgres Connection 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'taskflow_db', 
    password: '260424', 
    port: 5432,
});

app.use(cors());
app.use(express.json());


const notifyClients = () => io.emit('taskUpdate');

// --- REST ENDPOINTS ---

// All tasks 
app.get('/api/tasks', async (req, res) => {
    const { status } = req.query;
    try {
        let query = 'SELECT * FROM tasks';
        const params = [];
        if (status && status !== 'All Tasks') {
            query += ' WHERE status = $1';
            params.push(status);
        }
        query += ' ORDER BY createdat DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// New task with Priority and Date
app.post('/api/tasks', async (req, res) => {
    const { title, description, status, priority, duedate } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, status, priority, duedate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, status || 'To Do', priority || 'Medium', duedate || null]
        );
        io.emit('taskUpdate'); // Real-time broadcast
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit existing task
app.patch('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, duedate } = req.body;
    try {
        await pool.query(
            'UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4, duedate=$5, updatedat=NOW() WHERE id=$6',
            [title, description, status, priority, duedate, id]
        );
        io.emit('taskUpdate'); // Real-time broadcast
        res.json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE 
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
        notifyClients(); // Real-time trigger
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

server.listen(5000, () => {
    console.log('Backend running on http://localhost:5000');
});