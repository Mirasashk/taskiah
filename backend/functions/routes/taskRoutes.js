const express = require('express');
const router = express.Router();
const {
    addTask,
    getTasks,
    getTaskById,
    deleteTask,
    updateTask,
    deleteAllTasks,
} = require('../controllers/taskController');

router.post('/add', async (req, res) => {
    const task = req.body;
    const newTask = {
        id: await addTask(task),
        ...task,
    };
    console.log('newTask', newTask);
    res.json(newTask);
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const tasks = await getTasks(userId);
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const task = await getTaskById(id);
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await deleteTask(id);
    res.send('Task deleted!');
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const taskData = req.body;
    console.log('taskData', taskData);
    await updateTask(id, taskData);
    res.send('Task updated!');
});

router.delete('/all/:userId', async (req, res) => {
    const userId = req.params.userId;
    await deleteAllTasks(userId);
    res.send('All tasks deleted!');
});

module.exports = router;
