const User = require('../models/userModel');
const { db, storage, bucket } = require('../config/firebase');

async function addUser(user) {
    const userModel = new User(user);
    userModel.validate();
    await db.collection('users').doc(user.id).set(userModel.toJSON());
    return userModel.toJSON();
}

async function getUser(userId) {
    const user = await db.collection('users').doc(userId).get();
    return user.data();
}

async function updateUser(userId, user, res) {
    try {
        // Update user document in Firestore
        await db
            .collection('users')
            .doc(userId)
            .update({
                ...user,
                updatedAt: new Date(),
            });

        // Get the updated user data
        const userDoc = await db
            .collection('users')
            .doc(userId)
            .get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({
            id: userDoc.id,
            ...userDoc.data(),
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res
            .status(500)
            .json({ error: 'Failed to update user' });
    }
}

module.exports = { addUser, getUser, updateUser };
