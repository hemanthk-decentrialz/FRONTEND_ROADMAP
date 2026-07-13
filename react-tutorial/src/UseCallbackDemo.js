import React, { useState, useCallback, memo } from 'react';

// Child component using React.memo to prevent unnecessary re-renders
const ChildComponent = memo(({ onButtonClick, label, count }) => {
  console.log(`🔄 Rendering ${label}`);
  
  return (
    <div style={{ 
      padding: '10px', 
      margin: '5px 0', 
      backgroundColor: '#e3f2fd', 
      borderRadius: '4px',
      border: '1px solid #90caf9'
    }}>
      <p>{label}: {count}</p>
      <button onClick={onButtonClick}>Increment</button>
    </div>
  );
});

// Add display name for better debugging
ChildComponent.displayName = 'ChildComponent';

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const [text, setText] = useState('');

  // With useCallback - function reference stays the same between renders
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Empty array = function never changes

  // Another memoized function
  const handleOtherClick = useCallback(() => {
    setOtherState(prev => prev + 1);
  }, []);

  // This function changes on every render (not memoized)
  const nonMemoizedFunction = () => {
    console.log('⚠️ This function changes every render');
    setCount(prev => prev + 1);
  };

  // With dependencies - function changes when dependencies change
  const handleIncrementBy = useCallback((amount) => {
    setCount(prev => prev + amount);
  }, []); // Empty because setCount is stable

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>useCallback Demo</h3>
      
      <div style={{ margin: '10px 0' }}>
        <h4>Parent State</h4>
        <p>Count: {count}</p>
        <p>Other State: {otherState}</p>
        <p>Text: {text || 'Not set'}</p>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something"
        />
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <h4>Child Components (Memoized)</h4>
        {/* These components won't re-render unnecessarily */}
        <ChildComponent 
          onButtonClick={handleClick} 
          label="Memoized Child 1" 
          count={count}
        />
        <ChildComponent 
          onButtonClick={handleOtherClick} 
          label="Memoized Child 2" 
          count={otherState}
        />
      </div>

      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        <h4>Parent Actions</h4>
        <button onClick={() => setCount(count + 1)}>
          Parent Increment Count
        </button>
        <button onClick={nonMemoizedFunction} style={{ marginLeft: '10px' }}>
          Non-memoized Function (causes re-render)
        </button>
        <button 
          onClick={() => handleIncrementBy(5)} 
          style={{ marginLeft: '10px' }}
        >
          Increment by 5
        </button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
        <p><strong>💡 Check Console:</strong> </p>
        <p>• Child components only re-render when their specific state changes</p>
        <p>• Memoized functions prevent unnecessary child re-renders</p>
        <p>• The non-memoized function causes re-renders even when not needed</p>
      </div>
    </div>
  );
}

export default UseCallbackDemo;