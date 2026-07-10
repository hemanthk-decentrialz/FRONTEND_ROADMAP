import React, { useState } from 'react';

function Counter() {
  // useState returns [currentState, setterFunction]
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John', age: 25 });

  const increment = () => {
    // Updating state based on previous state
    setCount(prevCount => prevCount + 1);
  };

  const updateUser = () => {
    // Updating object state (spread operator preserves other properties)
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      
      <h3>User: {user.name}, Age: {user.age}</h3>
      <button onClick={updateUser}>Birthday!</button>
    </div>
  );
}

export default Counter;