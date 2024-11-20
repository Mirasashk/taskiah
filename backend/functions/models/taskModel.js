const { db } = require('../config/firebase');

class Task {
    constructor(data) {
        this.title = data.title;
        this.description = data.description;
        this.status = data.status || 'incomplete';
        this.category = data.category;
        this.priority = data.priority;
        this.dueDate = data.dueDate;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.ownerId = data.ownerId;
        this.sharedWith = data.sharedWith || [];
        this.permissions = data.permissions || {};
    }

    validate() {
        // Required fields validation
        if (!this.title) throw new Error('Title is required');
        if (!this.description)
            throw new Error('Description is required');
        if (!this.category) throw new Error('Category is required');
        if (!this.priority) throw new Error('Priority is required');
        if (!this.ownerId) throw new Error('Owner ID is required');

        // Enum validations
        const validStatuses = [
            'incomplete',
            'in-progress',
            'completed',
        ];
        const validPriorities = ['low', 'medium', 'high'];
        const validPermissions = ['read', 'edit'];

        if (!validStatuses.includes(this.status)) {
            throw new Error('Invalid status value');
        }

        if (!validPriorities.includes(this.priority)) {
            throw new Error('Invalid priority value');
        }

        // Validate permissions format
        if (this.permissions) {
            for (const [userId, permission] of Object.entries(
                this.permissions
            )) {
                if (!validPermissions.includes(permission)) {
                    throw new Error(
                        `Invalid permission value for user ${userId}`
                    );
                }
                // Ensure user is in sharedWith array
                if (!this.sharedWith.includes(userId)) {
                    throw new Error(
                        `User ${userId} has permissions but is not in sharedWith array`
                    );
                }
            }
        }

        // Validate sharedWith array
        if (!Array.isArray(this.sharedWith)) {
            throw new Error('sharedWith must be an array');
        }

        return true;
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            status: this.status,
            category: this.category,
            priority: this.priority,
            dueDate: this.dueDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            ownerId: this.ownerId,
            sharedWith: this.sharedWith,
            permissions: this.permissions,
        };
    }
}

module.exports = Task;
