// ==================== DOM MANIPULATION ====================

import { User, UserManager, userManager, defaultUsers, Utils } from './es6-modules.js';

// DOM Elements
const elements = {
    userList: document.getElementById('userList'),
    userForm: document.getElementById('userForm'),
    nameInput: document.getElementById('nameInput'),
    ageInput: document.getElementById('ageInput'),
    emailInput: document.getElementById('emailInput'),
    errorDisplay: document.getElementById('errorDisplay'),
    totalUsers: document.getElementById('totalUsers'),
    activeUsers: document.getElementById('activeUsers'),
    inactiveUsers: document.getElementById('inactiveUsers')
};

// Initialize with default users if empty
function initializeUsers() {
    if (userManager.getAllUsers().length === 0) {
        defaultUsers.forEach(userData => {
            const user = new User(userData.name, userData.age, userData.email);
            userManager.addUser(user);
        });
    }
}

// Render all users
function renderUsers() {
    const users = userManager.getAllUsers();
    
    if (users.length === 0) {
        elements.userList.innerHTML = `
            <div class="empty-state">
                <p>📭 No users yet. Add your first user above!</p>
            </div>
        `;
        updateStats();
        return;
    }
    
    // Using map to create HTML
    const userCards = users.map(user => createUserCard(user)).join('');
    elements.userList.innerHTML = userCards;
    updateStats();
    
    // Attach event listeners to new buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', handleToggleStatus);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteUser);
    });
}

// Create user card using template literals
function createUserCard(user) {
    const statusClass = user.active ? 'status-active' : 'status-inactive';
    const statusText = user.active ? 'Active' : 'Inactive';
    
    return `
        <div class="user-card" data-id="${user.id}">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>Age: ${user.age} years</p>
                <p>Email: ${user.email}</p>
                <p>Status: <span class="${statusClass}">${statusText}</span></p>
                <p style="font-size: 12px; color: #999;">
                    Joined: ${Utils.formatDate(user.createdAt)}
                </p>
            </div>
            <div class="user-actions">
                <button class="toggle-btn" data-id="${user.id}">
                    ${user.active ? '🔴 Deactivate' : '🟢 Activate'}
                </button>
                <button class="delete-btn" data-id="${user.id}">🗑️ Delete</button>
            </div>
        </div>
    `;
}

// Update statistics
function updateStats() {
    const stats = userManager.getStats();
    elements.totalUsers.textContent = stats.total;
    elements.activeUsers.textContent = stats.active;
    elements.inactiveUsers.textContent = stats.inactive;
}

// Show message
function showMessage(message, type = 'success') {
    const display = elements.errorDisplay;
    display.textContent = message;
    display.className = `show ${type}`;
    
    setTimeout(() => {
        display.className = '';
        display.textContent = '';
    }, 3000);
}

// Handle form submission (Event: Submit)
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = elements.nameInput.value.trim();
    const age = parseInt(elements.ageInput.value);
    const email = elements.emailInput.value.trim();
    
    // Validation
    if (!name || !age || !email) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!Utils.isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (isNaN(age) || age < 1 || age > 120) {
        showMessage('Please enter a valid age (1-120)', 'error');
        return;
    }
    
    try {
        // Create new user
        const newUser = new User(name, age, email);
        userManager.addUser(newUser);
        
        // Re-render
        renderUsers();
        
        // Reset form
        event.target.reset();
        
        showMessage(`✅ User ${name} added successfully!`, 'success');
    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Handle toggle status (Event: Click)
function handleToggleStatus(event) {
    const userId = event.target.dataset.id;
    try {
        const newStatus = userManager.toggleUserStatus(userId);
        const user = userManager.getUserById(userId);
        showMessage(
            `${user.name} is now ${newStatus ? 'active' : 'inactive'}`,
            'success'
        );
        renderUsers();
    } catch (error) {
        showMessage(`Error: ${error.message}`, 'error');
    }
}

// Handle delete user (Event: Click)
function handleDeleteUser(event) {
    const userId = event.target.dataset.id;
    const user = userManager.getUserById(userId);
    
    if (user && confirm(`Are you sure you want to delete ${user.name}?`)) {
        try {
            userManager.deleteUser(userId);
            showMessage(`🗑️ User ${user.name} deleted successfully`, 'success');
            renderUsers();
        } catch (error) {
            showMessage(`Error: ${error.message}`, 'error');
        }
    }
}

// Keyboard Events
document.addEventListener('keydown', function(event) {
    // Ctrl + N to open form focus
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        elements.nameInput.focus();
        showMessage('🎯 Name field focused', 'success');
    }
    
    // Escape to clear form
    if (event.key === 'Escape') {
        elements.userForm.reset();
        showMessage('Form cleared', 'success');
    }
});

// Mouse Events for user cards (using delegation)
document.addEventListener('mouseover', function(event) {
    const card = event.target.closest('.user-card');
    if (card) {
        card.style.transform = 'scale(1.02)';
        card.style.transition = 'transform 0.2s';
    }
});

document.addEventListener('mouseout', function(event) {
    const card = event.target.closest('.user-card');
    if (card) {
        card.style.transform = 'scale(1)';
    }
});

// Load users from storage on page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeUsers();
        renderUsers();
        
        // Show storage info
        const users = userManager.getAllUsers();
        console.log(`✅ Loaded ${users.length} users from localStorage`);
        console.log('📊 Stats:', userManager.getStats());
        
        // Log all users (using for...of)
        console.log('👥 All users:');
        for (const user of users) {
            console.log(`- ${user.name} (${user.age}) - ${user.email}`);
        }
        
        showMessage(`✅ Welcome! ${users.length} users loaded`, 'success');
    } catch (error) {
        showMessage(`Error loading users: ${error.message}`, 'error');
    }
});

// Form event listener (Change event)
elements.nameInput.addEventListener('change', function() {
    console.log('Name changed to:', this.value);
});

// Form event listener (Submit)
elements.userForm.addEventListener('submit', handleFormSubmit);

// Export for debugging
console.log('DOM Script loaded with ES6 modules!');
console.log('Available functions:');
console.log('- renderUsers()');
console.log('- userManager (instance)');
console.log('- Utils (utilities)');

// Expose to global for debugging
window.app = {
    userManager,
    renderUsers,
    Utils,
    User
};