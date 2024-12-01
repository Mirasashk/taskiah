class Notification {
    constructor(data) {
        this.message = data.message;
        this.type = data.type;
        this.status = data.status || 'unread';
        this.createdAt = data.createdAt || new Date().toISOString();
        this.notifyOn = data.notifyOn || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
    }

    validate() {
        if (!this.message) throw new Error('Message is required');
        // Type needs to be one of task, reminder, or event
        if (!['important', 'reminder', 'dueDate'].includes(this.type))
            throw new Error('Type must be task, reminder, or event');
        //status needs to be one of unread, read, or archived
        if (!['unread', 'read', 'archived'].includes(this.status))
            throw new Error(
                'Status must be unread, read, or archived'
            );
    }

    toJSON() {
        return {
            message: this.message,
            type: this.type,
            status: this.status,
            createdAt: this.createdAt,
            notifyOn: this.notifyOn,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = Notification;
