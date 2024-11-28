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

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const tasks = await getTasks(userId);
    res.json(tasks);
});

module.exports = router;
