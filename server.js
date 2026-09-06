const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILE_PATH = 'tasks.json';

// Middleware: lets the server understand JSON sent from the browser
app.use(express.json());

// Middleware: serves static files (HTML/CSS/JS) from the "public" folder
app.use(express.static('public'));

function loadTasks() {
  if (fs.existsSync(FILE_PATH)) {
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  }
  return [];
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  const title = req.body.title;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  const task = { id: tasks.length + 1, title, completed: false };
  tasks.push(task);
  saveTasks(tasks);
  res.status(201).json(task);
});

// PUT (update) a task's completed status
app.put('/api/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = true;
  saveTasks(tasks);
  res.json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  saveTasks(tasks);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});