const User = require('../models/userModel');
const { db } = require('../config/firebase');

async function addUser(user) {
    const userModel = new User(user);
    userModel.validate();
    await db.collection('users').doc(user.id).set(userModel.toJSON());
    return userModel.toJSON();
}

module.exports = { addUser };
