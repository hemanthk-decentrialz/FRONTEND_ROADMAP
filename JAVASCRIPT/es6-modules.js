// ==================== ES6+ FEATURES ====================

// Exporting utilities
export const Utils = {
    // Generate unique ID
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },
    
    // Validate email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

// User class using ES6
export class User {
    constructor(name, age, email) {
        this.id = Utils.generateId();
        this.name = name;
        this.age = age;
        this.email = email;
        this.active = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    
    // Getter
    get status() {
        return this.active ? '🟢 Active' : '🔴 Inactive';
    }
    
    // Method to toggle status
    toggleStatus() {
        this.active = !this.active;
        this.updatedAt = new Date();
        return this.active;
    }
    
    // Method to update user info
    updateInfo({ name, age, email }) {
        if (name) this.name = name;
        if (age) this.age = age;
        if (email) this.email = email;
        this.updatedAt = new Date();
        return this;
    }
}

// UserManager class
export class UserManager {
    constructor() {
        this.users = [];
        this.loadFromStorage();
    }
    
    // Add user
    addUser(user) {
        if (!(user instanceof User)) {
            throw new Error('Invalid user object');
        }
        this.users.push(user);
        this.saveToStorage();
        return user;
    }
    
    // Get all users
    getAllUsers() {
        return [...this.users]; // Spread operator - return copy
    }
    
    // Get user by ID
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    
    // Update user
    updateUser(id, updates) {
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');
        user.updateInfo(updates);
        this.saveToStorage();
        return user;
    }
    
    // Delete user
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) throw new Error('User not found');
        const deleted = this.users.splice(index, 1)[0];
        this.saveToStorage();
        return deleted;
    }
    
    // Toggle user status
    toggleUserStatus(id) {
        const user = this.getUserById(id);
        if (!user) throw new Error('User not found');
        const newStatus = user.toggleStatus();
        this.saveToStorage();
        return newStatus;
    }
    
    // Get statistics using reduce
    getStats() {
        return {
            total: this.users.length,
            active: this.users.filter(u => u.active).length,
            inactive: this.users.filter(u => !u.active).length,
            averageAge: this.users.reduce((sum, u) => sum + u.age, 0) / this.users.length || 0
        };
    }
    
    // Search users (using filter)
    searchUsers(query) {
        const searchTerm = query.toLowerCase();
        return this.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort users (using sort)
    sortUsers(by = 'name', order = 'asc') {
        const sorted = [...this.users];
        sorted.sort((a, b) => {
            let valA = a[by];
            let valB = b[by];
            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            if (order === 'asc') {
                return valA > valB ? 1 : -1;
            } else {
                return valA < valB ? 1 : -1;
            }
        });
        return sorted;
    }
    
    // Save to localStorage
    saveToStorage() {
        try {
            const data = this.users.map(user => ({
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString()
            }));
            localStorage.setItem('users', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }
    
    // Load from localStorage
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('users');
            if (stored) {
                const data = JSON.parse(stored);
                this.users = data.map(userData => {
                    const user = new User(
                        userData.name,
                        userData.age,
                        userData.email
                    );
                    user.id = userData.id;
                    user.active = userData.active;
                    user.createdAt = new Date(userData.createdAt);
                    user.updatedAt = new Date(userData.updatedAt);
                    return user;
                });
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.users = [];
        }
    }
    
    // Clear all users
    clearAll() {
        this.users = [];
        this.saveToStorage();
    }
}

// Create and export singleton instance
export const userManager = new UserManager();

// Export some default data for initialization
export const defaultUsers = [
    { name: 'Alice Johnson', age: 28, email: 'alice@example.com' },
    { name: 'Bob Smith', age: 35, email: 'bob@example.com' },
    { name: 'Charlie Brown', age: 22, email: 'charlie@example.com' }
];