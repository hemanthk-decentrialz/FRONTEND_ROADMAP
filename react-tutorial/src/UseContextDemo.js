// File: src/UseContextDemo.js
import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';

// Child component that uses context
const UserProfile = () => {
  const { user, logout, updateName } = useUser();
  const [newName, setNewName] = useState('');

  const handleUpdateName = () => {
    if (newName.trim()) {
      updateName(newName.trim());
      setNewName('');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e3f2fd', 
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h4>User Profile (Child Component)</h4>
      <p><strong>Name:</strong> {user.name || 'Not logged in'}</p>
      <p><strong>Email:</strong> {user.email || 'No email'}</p>
      <p><strong>Status:</strong> {user.isLoggedIn ? '✅ Logged In' : '❌ Logged Out'}</p>
      
      {user.isLoggedIn && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleUpdateName}>Update Name</button>
        </div>
      )}
      
      <button 
        onClick={logout}
        style={{ 
          marginTop: '10px',
          backgroundColor: user.isLoggedIn ? '#f44336' : '#4caf50',
          color: 'white'
        }}
      >
        {user.isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
};

// Another component that uses the same context
const UserStatus = () => {
  const { user } = useUser();
  
  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: '#f3e5f5', 
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h4>User Status (Another Component)</h4>
      <p>Current user: <strong>{user.isLoggedIn ? user.name : 'Guest'}</strong></p>
      <p>Status: {user.isLoggedIn ? '🟢 Online' : '⚫ Offline'}</p>
    </div>
  );
};

// Login component
const LoginComponent = () => {
  const { user, login } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleLogin = () => {
    if (formData.name.trim() && formData.email.trim()) {
      login({
        name: formData.name.trim(),
        email: formData.email.trim()
      });
      setFormData({ name: '', email: '' });
    }
  };

  if (user.isLoggedIn) {
    return null;
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#e8f5e9', 
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h4>Login Form</h4>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={{ margin: '5px', padding: '5px' }}
      />
      <button onClick={handleLogin} style={{ margin: '5px' }}>
        Login
      </button>
    </div>
  );
};

// Main component with Provider
function UseContextDemo() {
  return (
    <UserProvider>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>useContext Demo - User Management</h3>
        
        <div style={{ margin: '10px 0' }}>
          <p><strong>💡 How Context Works:</strong></p>
          <ul>
            <li>User data is shared across all components without prop drilling</li>
            <li>Any component can access and update the user state</li>
            <li>Changes are reflected everywhere instantly</li>
          </ul>
        </div>

        <LoginComponent />
        <UserProfile />
        <UserStatus />
        
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          <p><strong>📝 Note:</strong> Try logging in with any name and email, then update the name from the profile component. All components will update automatically!</p>
        </div>
      </div>
    </UserProvider>
  );
}

export default UseContextDemo;