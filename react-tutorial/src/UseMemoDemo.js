import React, { useState, useMemo } from 'react';

function UseMemoDemo() {
  const [number, setNumber] = useState(5);
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Expensive calculation that only runs when 'number' changes
  const factorial = useMemo(() => {
    console.log('🔄 Calculating factorial...');
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]); // Only recalculates when number changes

  // Without useMemo, this would recalculate on every render
  const expensiveValue = useMemo(() => {
    console.log('🔄 Computing expensive value...');
    // Simulating expensive computation
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return (sum % 1000) + number * 1000;
  }, [number]);

  // This is NOT memoized - recalculates on every render
  const nonMemoizedValue = (() => {
    console.log('🔄 Non-memoized calculation (runs every render)');
    return number * 2;
  })();

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>useMemo Demo</h3>
      
      <div style={{ margin: '10px 0' }}>
        <h4>Expensive Calculations</h4>
        <p>Number: {number}</p>
        <button onClick={() => setNumber(number + 1)}>Increment Number</button>
        <button onClick={() => setNumber(Math.max(0, number - 1))}>Decrement Number</button>
        
        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
          <p><strong>Memoized Results (only recalculated when number changes):</strong></p>
          <p>Factorial of {number}: {factorial.toLocaleString()}</p>
          <p>Expensive Value: {expensiveValue}</p>
        </div>

        <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
          <p><strong>Non-memoized (recalculated every render):</strong></p>
          <p>Value: {nonMemoizedValue}</p>
        </div>
      </div>

      <div style={{ margin: '10px 0', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <h4>Unrelated State (Does NOT trigger recalculations)</h4>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        
        <div style={{ margin: '10px 0' }}>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something (doesn't recalculate)"
          />
          <p>Text: {text || 'Not set'}</p>
        </div>
        
        <div style={{ padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          <p><strong>💡 Check Console:</strong> Memoized functions only log when 'number' changes!</p>
          <p>Changing count or text doesn't trigger expensive recalculations.</p>
        </div>
      </div>
    </div>
  );
}

export default UseMemoDemo;