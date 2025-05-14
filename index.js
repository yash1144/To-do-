const express = require('express');
const app = express();
const port = 8001;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'));

let tasks = [];

app.get('/', (req, res) => {
    const showAdd = req.query.showAdd;
    res.render('index', { tasks, editTask: null, showAdd });
});

app.post('/add-task', (req, res) => {
    const { taskTitle, taskDate, taskDesc } = req.body;
    if (taskTitle && taskDate) {
        tasks.push({
            id: Date.now().toString(),
            title: taskTitle,
            date: taskDate,
            desc: taskDesc || ''
        });
    }
    res.redirect('/');
});

// Edit view
app.get('/edit-task', (req, res) => {
    const taskId = req.query.id;
    const editTask = tasks.find(task => task.id === taskId);
    res.render('index', { tasks, editTask, showAdd: false });
});

app.post('/edit-task', (req, res) => {
    const { id, taskTitle, taskDate, taskDesc } = req.body;
    tasks = tasks.map(task =>
        task.id === id ? { ...task, title: taskTitle, date: taskDate, desc: taskDesc } : task
    );
    res.redirect('/');
});

app.get('/delete-task', (req, res) => {
    const id = req.query.id;
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
