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

    // if (user.data().photoURL) {
    //     const storageRef = bucket.file(user.data().photoURL);
    //     // Add expiration time and proper configuration for signed URL
    //     const [url] = await storageRef.getSignedUrl({
    //         action: 'read',
    //         expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    //     });

    //     return {
    //         ...user.data(),
    //         photoURL: url,
    //     };
    // }

    return user.data();
}

module.exports = { addUser, getUser };
