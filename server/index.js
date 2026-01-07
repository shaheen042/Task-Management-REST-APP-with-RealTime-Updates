require('dotenv').config(); 
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Socket.io setup with dynamic CORS
const io = new Server(server, {
    cors: { origin: "http://localhost:5173" } 
});

// Postgres Connection using .env variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

// Socket.io connection logging
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const notifyClients = () => io.emit('taskUpdate');

// --- REST ENDPOINTS ---

// GET all tasks (with optional status filter)
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

// POST New task
app.post('/api/tasks', async (req, res) => {
    const { title, description, status, priority, duedate } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, status, priority, duedate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, description, status || 'To Do', priority || 'Medium', duedate || null]
        );
        notifyClients(); 
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH Edit task
app.patch('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, duedate } = req.body;
    try {
        await pool.query(
            'UPDATE tasks SET title=$1, description=$2, status=$3, priority=$4, duedate=$5, updatedat=NOW() WHERE id=$6',
            [title, description, status, priority, duedate, id]
        );
        notifyClients();
        res.json({ message: "Task updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE Task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
        notifyClients(); 
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Use PORT from .env or default to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});