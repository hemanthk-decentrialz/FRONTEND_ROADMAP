import React, { useState } from 'react';

function UseStateDemo() {
  // Multiple state variables
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // State with initial value from function (lazy initialization)
  const [count, setCount] = useState(() => {
    // Check if localStorage is available
    try {
      const savedCount = localStorage.getItem('count');
      return savedCount ? Number(savedCount) : 0;
    } catch {
      return 0;
    }
  });

  // Complex state (objects/arrays)
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    address: {
      city: 'New York',
      country: 'USA'
    }
  });

  const updateCity = (newCity) => {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        city: newCity
      }
    }));
  };

  // Save count to localStorage when it changes
  const updateCount = (newCount) => {
    setCount(newCount);
    try {
      localStorage.setItem('count', String(newCount));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>useState Demo</h3>
      
      <div style={{ margin: '10px 0' }}>
        <h4>Simple State</h4>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter name"
        />
        <p>Name: {name || 'Not set'}</p>
        <p>Age: {age}</p>
        <button onClick={() => setAge(age + 1)}>Increase Age</button>
        <button onClick={() => setIsActive(!isActive)}>
          Toggle Status: {isActive ? 'Active' : 'Inactive'}
        </button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <h4>State with localStorage</h4>
        <p>Count: {count}</p>
        <button onClick={() => updateCount(count + 1)}>Increment</button>
        <button onClick={() => updateCount(0)}>Reset</button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <h4>Complex State (Object)</h4>
        <p>User: {user.name}, Age: {user.age}</p>
        <p>Location: {user.address.city}, {user.address.country}</p>
        <button onClick={() => setUser(prev => ({ ...prev, age: prev.age + 1 }))}>
          Birthday!
        </button>
        <button onClick={() => updateCity('Los Angeles')}>
          Move to LA
        </button>
      </div>
    </div>
  );
}

export default UseStateDemo;