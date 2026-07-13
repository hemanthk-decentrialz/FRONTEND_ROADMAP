import React from 'react';

// Props are read-only data passed from parent to child
function UserCard({ name, age, email, isAdmin }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px' }}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span style={{ color: 'red' }}>🔑 Admin</span>}
    </div>
  );
}

// Default props
UserCard.defaultProps = {
  name: 'Unknown User',
  age: 0,
  email: 'no-email@example.com',
  isAdmin: false
};

export default UserCard;