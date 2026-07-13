import React from 'react';

function JSXExample() {
  // JSX allows HTML-like syntax in JavaScript
  const name = "John";
  const isLoggedIn = true;
  
  // You can embed JavaScript expressions in {}
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>2 + 2 = {2 + 2}</p>
      
      {/* Conditional rendering in JSX */}
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <p>Please log in</p>
      )}
      
      {/* JSX attributes use camelCase */}
      <input type="text" className="form-input" maxLength={10} />
    </div>
  );
}

export default JSXExample;