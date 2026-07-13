import React, { useState, useEffect } from 'react';

function UseEffectDemo() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isMounted, setIsMounted] = useState(true);

  // 1. useEffect without dependencies - runs after every render
  useEffect(() => {
    console.log('Runs after every render');
  });

  // 2. useEffect with empty array - runs only once (mount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component unmounted');
      setIsMounted(false);
    };
  }, []);

  // 3. useEffect with dependencies - runs when dependencies change
  useEffect(() => {
    console.log('Count changed to:', count);
    document.title = `Count: ${count}`;
    
    // Update localStorage
    try {
      localStorage.setItem('lastCount', String(count));
    } catch {
      // Ignore storage errors
    }
  }, [count]);

  // 4. useEffect for API calls (with cleanup)
  useEffect(() => {
    let isSubscribed = true;
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const result = await response.json();
        if (isSubscribed) {
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isSubscribed) {
          setData({ error: 'Failed to fetch data' });
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isSubscribed = false;
    };
  }, []); // Empty array = runs once

  // 5. useEffect with cleanup for event listeners
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized:', window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>useEffect Demo</h3>
      
      <div style={{ margin: '10px 0' }}>
        <h4>Counter with Side Effects</h4>
        <p>Count: {count}</p>
        <p>Check browser title bar - it updates with count!</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <h4>API Data (Fetched on Mount)</h4>
        {data ? (
          data.error ? (
            <p style={{ color: 'red' }}>{data.error}</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <p><strong>Note:</strong> Check the console to see useEffect logs!</p>
        <p>Resize your browser window to see the resize event listener in action.</p>
      </div>
    </div>
  );
}

export default UseEffectDemo;