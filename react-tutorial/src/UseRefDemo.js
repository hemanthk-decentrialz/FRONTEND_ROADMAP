import React, { useRef, useState, useEffect } from 'react';

function UseRefDemo() {
  // 1. Reference DOM elements
  const inputRef = useRef(null);
  const divRef = useRef(null);
  
  // 2. Store mutable values (doesn't cause re-render)
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // 3. Store previous state
  const prevCountRef = useRef(0);
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = 'lightblue';
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.backgroundColor = '';
        }
      }, 2000);
    }
  };

  const changeDivColor = () => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = 
        divRef.current.style.backgroundColor === 'lightgreen' ? '' : 'lightgreen';
    }
  };

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      setIsTimerRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTimerRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };

  const getPreviousCount = () => {
    return prevCountRef.current;
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>useRef Demo</h3>
      
      {/* DOM reference - Input */}
      <div style={{ margin: '10px 0' }}>
        <h4>DOM Reference - Input Focus</h4>
        <input 
          ref={inputRef} 
          placeholder="Click button to focus" 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={focusInput}>Focus Input</button>
      </div>
      
      {/* DOM reference - Div */}
      <div style={{ margin: '10px 0' }}>
        <h4>DOM Reference - Div Manipulation</h4>
        <div 
          ref={divRef} 
          style={{ 
            border: '1px solid #ccc', 
            padding: '20px', 
            margin: '10px 0',
            transition: 'background-color 0.3s ease',
            borderRadius: '4px'
          }}
        >
          This div's background changes on click
        </div>
        <button onClick={changeDivColor}>Toggle Div Color</button>
      </div>
      
      {/* Storing mutable values - Timer */}
      <div style={{ margin: '10px 0' }}>
        <h4>Mutable Values - Timer (No Re-render on interval reference)</h4>
        <p>Count: {count}</p>
        <p>Previous Count: {getPreviousCount()}</p>
        <p>Timer Status: {isTimerRunning ? '⏳ Running' : '⏹ Stopped'}</p>
        <button onClick={startTimer} disabled={isTimerRunning}>
          Start Timer
        </button>
        <button onClick={stopTimer} disabled={!isTimerRunning}>
          Stop Timer
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <p><strong>💡 Tip:</strong> The interval reference (useRef) persists across renders without causing re-renders</p>
      </div>
    </div>
  );
}

export default UseRefDemo;