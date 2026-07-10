import React, { useState } from 'react';

function ConditionalRender() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('guest'); // 'guest', 'user', 'admin'
  const [showContent, setShowContent] = useState(true);

  // Method 1: if-else (outside JSX)
  let greeting;
  if (isLoggedIn) {
    greeting = <h2>Welcome back!</h2>;
  } else {
    greeting = <h2>Please log in</h2>;
  }

  // Function to handle role change
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    // Auto-login when changing to user or admin
    if (newRole !== 'guest') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Function to handle login/logout
  const handleLoginToggle = () => {
    const newLoginState = !isLoggedIn;
    setIsLoggedIn(newLoginState);
    // If logging out, reset role to guest
    if (!newLoginState) {
      setRole('guest');
    }
  };

  // Method 4: Switch case using function
  const renderRoleContent = () => {
    switch(role) {
      case 'admin':
        return (
          <div style={{ padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            <p>🔑 Admin Panel</p>
            <ul>
              <li>Manage Users</li>
              <li>View Reports</li>
              <li>System Settings</li>
              <li>Delete Content</li>
            </ul>
          </div>
        );
      case 'user':
        return (
          <div style={{ padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
            <p>👤 User Dashboard</p>
            <ul>
              <li>View Profile</li>
              <li>Edit Settings</li>
              <li>My Posts</li>
              <li>Messages</li>
            </ul>
          </div>
        );
      default:
        return (
          <div style={{ padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <p>👋 Guest View</p>
            <ul>
              <li>Browse Content</li>
              <li>Read Articles</li>
              <li>View Public Posts</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Conditional Rendering Demo</h3>
      
      {/* Method 1: if-else */}
      <div style={{ margin: '10px 0' }}>
        <h4>Method 1: if-else</h4>
        {greeting}
      </div>

      {/* Method 2: Ternary operator */}
      <div style={{ margin: '10px 0' }}>
        <h4>Method 2: Ternary Operator</h4>
        <p>Status: {isLoggedIn ? 'Online 🟢' : 'Offline ⚫'}</p>
        <p>Role: {role === 'admin' ? 'Administrator' : role === 'user' ? 'User' : 'Guest'}</p>
      </div>

      {/* Method 3: Logical && */}
      <div style={{ margin: '10px 0' }}>
        <h4>Method 3: Logical && (Short-circuit)</h4>
        {isLoggedIn && <p style={{ color: 'green' }}>✅ You have 3 new messages</p>}
        {isLoggedIn && role === 'admin' && <p style={{ color: 'red' }}>⚠️ You have admin privileges</p>}
        {!isLoggedIn && <p style={{ color: 'gray' }}>🔒 Please login to see messages</p>}
      </div>

      {/* Method 4: Switch case */}
      <div style={{ margin: '10px 0' }}>
        <h4>Method 4: Switch Case</h4>
        {renderRoleContent()}
      </div>

      {/* Controls */}
      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <h4>Controls</h4>
        
        <div style={{ margin: '10px 0' }}>
          <button 
            onClick={handleLoginToggle}
            style={{
              padding: '8px 16px',
              backgroundColor: isLoggedIn ? '#f44336' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>

        <div style={{ margin: '10px 0' }}>
          <p><strong>Select Role:</strong></p>
          <button 
            onClick={() => handleRoleChange('guest')}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              backgroundColor: role === 'guest' ? '#2196f3' : '#e0e0e0',
              color: role === 'guest' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guest
          </button>
          <button 
            onClick={() => handleRoleChange('user')}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              backgroundColor: role === 'user' ? '#2196f3' : '#e0e0e0',
              color: role === 'user' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            User
          </button>
          <button 
            onClick={() => handleRoleChange('admin')}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              backgroundColor: role === 'admin' ? '#2196f3' : '#e0e0e0',
              color: role === 'admin' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Admin
          </button>
        </div>

        <div style={{ margin: '10px 0' }}>
          <button 
            onClick={() => setShowContent(!showContent)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showContent ? 'Hide' : 'Show'} Content
          </button>
        </div>
      </div>

      {/* Toggle visibility */}
      <div style={{ margin: '10px 0' }}>
        <h4>Toggle Visibility</h4>
        {showContent && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: 'lightblue',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}>
            <p>📝 This content can be toggled!</p>
            <p>Current Role: <strong>{role}</strong></p>
            <p>Login Status: <strong>{isLoggedIn ? 'Logged In' : 'Logged Out'}</strong></p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#fff3e0', 
        borderRadius: '4px',
        borderLeft: '4px solid #ff9800'
      }}>
        <h4>📚 Summary of Conditional Rendering Methods</h4>
        <ul>
          <li><strong>if-else:</strong> Used outside JSX for complex conditions</li>
          <li><strong>Ternary Operator:</strong> Inline conditionals for simple true/false</li>
          <li><strong>Logical &amp;&amp;:</strong> Render only if condition is true</li>
          <li><strong>Switch:</strong> Multiple conditional cases (like role-based rendering)</li>
          <li><strong>Function Call:</strong> Using a function that returns JSX (like renderRoleContent)</li>
        </ul>
      </div>
    </div>
  );
}

export default ConditionalRender;