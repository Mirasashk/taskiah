const express = require('express');
const router = express.Router();
const {
    addTask,
    getTasks,
} = require('../controllers/taskController');

router.post('/add', async (req, res) => {
    const task = req.body;
    await addTask(task);
    res.send('Task added!');
});

router.get('/', async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
});

module.exports = router;
