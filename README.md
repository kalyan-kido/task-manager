# Task Manager

A full-stack task management web application built with Node.js and Express, featuring task prioritization, due dates, and a clean, accessible interface.

## Live Demo

🔗 [https://task-manager-njz1.onrender.com/](https://task-manager-njz1.onrender.com/)

*Note: hosted on Render's free tier — the app may take 30–60 seconds to load if it's been inactive (cold start).*

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Set priority levels (Low, Medium, High) with color-coded indicators
- Optional due dates
- Filter tasks by status (All / Active / Completed)
- Clear all completed tasks in one click
- Data persistence via JSON file storage
- Accessible form labels (WCAG-compliant inputs)
- Responsive design, works on mobile devices

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Data storage:** JSON file (`tasks.json`)
- **Fonts:** Space Grotesk, Inter (Google Fonts)

## Running Locally

1. Clone the repository:

       git clone https://github.com/kalyan-kido/task-manager.git
       cd task-manager

2. Install dependencies:

       npm install

3. Start the server:

       node server.js

4. Open your browser to `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update a task's title/priority/due date |
| PUT | `/api/tasks/:id` | Toggle a task's completed status |
| DELETE | `/api/tasks/:id` | Delete a specific task |
| DELETE | `/api/tasks/completed` | Delete all completed tasks |

## Known Limitations

- Data is stored in a local JSON file rather than a database, so it's not designed for concurrent multi-user access.
- On Render's free tier, the file system is temporary — task data resets whenever the service redeploys or restarts after inactivity.

## What I Learned

Building this project helped me practice full-stack development fundamentals: REST API design, DOM manipulation, asynchronous JavaScript (fetch/async-await), file-based data persistence, Git version control, and web accessibility basics.

## Future Improvements

- Replace JSON file storage with a real database (e.g., PostgreSQL or MongoDB)
- Add user authentication for multiple users
- Add task categories/tags