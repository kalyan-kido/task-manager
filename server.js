const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILE_PATH = 'tasks.json';

app.use(express.json());
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

app.get('/api/tasks', (req, res) => {
  res.json(loadTasks());
});

app.post('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  const { title, priority, dueDate } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  const task = {
    id: tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    completed: false,
    priority: priority || 'low',
    dueDate: dueDate || null
  };
  tasks.push(task);
  saveTasks(tasks);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (req.body.title !== undefined) {
    if (req.body.title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    task.title = req.body.title;
  }
  if (req.body.priority !== undefined) task.priority = req.body.priority;
  if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;

  saveTasks(tasks);
  res.json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  saveTasks(tasks);
  res.json(task);
});

app.delete('/api/tasks/completed', (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(t => !t.completed);
  saveTasks(tasks);
  res.status(204).send();
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  saveTasks(tasks);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});