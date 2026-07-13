import React, { useState } from 'react';

function EventDemo() {
  const [inputValue, setInputValue] = useState('');
  const [hoverText, setHoverText] = useState('Hover over me');

  // Event handler functions
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    alert('Button was clicked!');
  };

  const handleInputChange = (e) => {
    // e.target contains the DOM element that triggered the event
    setInputValue(e.target.value);
  };

  const handleMouseEnter = () => {
    setHoverText('You are hovering!');
  };

  const handleMouseLeave = () => {
    setHoverText('Hover over me');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      alert(`You pressed Enter with: ${e.target.value}`);
    }
  };

  return (
    <div>
      {/* Click event */}
      <button onClick={handleClick}>Click Me</button>
      
      {/* Input change event */}
      <input 
        type="text" 
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type something..."
      />
      <p>You typed: {inputValue}</p>
      
      {/* Mouse events */}
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ padding: '20px', backgroundColor: '#f0f0f0' }}
      >
        {hoverText}
      </div>
      
      {/* Form submit event */}
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
}

export default EventDemo;