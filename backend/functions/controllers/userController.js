const User = require('../models/userModel');
const { db, storage, bucket } = require('../config/firebase');
const { auth } = require('firebase-admin');

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
        // If email is being updated, update it in Firebase Auth first
        if (user.email) {
            try {
                await auth().updateUser(userId, {
                    email: user.email,
                });
            } catch (error) {
                console.error(
                    'Error updating email in Firebase Auth:',
                    error
                );
                return res.status(400).json({
                    error: 'Failed to update email. ' + error.message,
                });
            }
        }

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
