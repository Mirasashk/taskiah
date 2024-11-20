const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');

router.post('/add', async (req, res) => {
    const user = req.body;
    await addUser(user);
    res.send('User added!');
});

module.exports = router;
