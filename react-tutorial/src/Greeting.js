import React from 'react';

// Arrow function component
const Greeting = () => {
  const currentTime = new Date().toLocaleTimeString();
  
  return (
    <div>
      <h3>Good Morning!</h3>
      <p>Current time: {currentTime}</p>
    </div>
  );
};

// Regular function component
function Welcome() {
  return <h3>Welcome to our app!</h3>;
}

export { Greeting, Welcome };