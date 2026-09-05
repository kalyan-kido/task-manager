const fs = require('fs');
const FILE_PATH = 'tasks.json';

function loadTasks() {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

function saveTasks() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

let tasks = loadTasks();

function addTask(title) {
  if (!title || title.trim() === '') {
    console.log('Error: Task title cannot be empty. Usage: node index.js add <title>');
    return;
  }
  const task = {
    id: tasks.length + 1,
    title: title,
    completed: false
  };
  tasks.push(task);
  console.log(`Task added: "${title}"`);
  saveTasks();
}


function listTasks() {
  console.log("--- Your Tasks ---");
  tasks.forEach((task) => {
    const status = task.completed ? "[x]" : "[ ]";
    console.log(`${status} ${task.id}. ${task.title}`);
  });
}

function completeTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    console.log(`Error: No task found with id ${id}`);
    return;
  }
  task.completed = true;
  console.log(`Task ${id} marked as complete.`);
  saveTasks();
}

function deleteTask(id) {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === initialLength) {
    console.log(`Error: No task found with id ${id}`);
  } else {
    console.log(`Task ${id} deleted.`);
  }
  saveTasks();
}

// Get real user input, skipping the first two boilerplate entries
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    const title = args.slice(1).join(' ');
    addTask(title);
    break;

  case 'list':
    listTasks();
    break;

  case 'complete':
    completeTask(Number(args[1]));
    break;

  case 'delete':
    deleteTask(Number(args[1]));
    break;

  default:
    console.log('Unknown command. Use: add, list, complete, or delete.');
}