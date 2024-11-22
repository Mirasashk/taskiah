const express = require('express');
const router = express.Router();
const {
    addUser,
    getUser,
    updateUser,
} = require('../controllers/userController');

router.post('/add', async (req, res) => {
    const user = req.body;
    await addUser(user);
    res.send('User added!');
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await getUser(userId);
    res.json(user);
});

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = req.body;
    await updateUser(userId, user, res);
});

module.exports = router;
