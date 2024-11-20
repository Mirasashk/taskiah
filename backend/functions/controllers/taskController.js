const { db } = require('../config/firebase');

async function addTask(task) {
    try {
        const docRef = await db.collection('tasks').add(task);
        console.log('Task added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function getTasks() {
    try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasks = tasksSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return tasks;
    } catch (error) {
        console.error('Error getting tasks:', error);
    }
}

async function updateTask(taskId, updates) {
    try {
        await db.collection('tasks').doc(taskId).update(updates);
        console.log('Task updated successfully.');
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(taskId) {
    try {
        await db.collection('tasks').doc(taskId).delete();
        console.log('Task deleted successfully.');
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

module.exports = { addTask, getTasks, updateTask, deleteTask };