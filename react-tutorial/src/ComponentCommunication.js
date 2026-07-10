import React, { useState } from 'react';

// 1. Parent to Child (via props)
const Child = ({ message, onChildEvent }) => {
  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <p>Child received: {message}</p>
      <button onClick={() => onChildEvent('Hello from Child!')}>
        Send to Parent
      </button>
    </div>
  );
};

// 2. Sibling Communication (via Parent)
const Sibling1 = ({ onSendData }) => {
  const [input, setInput] = useState('');
  
  return (
    <div style={{ border: '1px solid green', padding: '10px', margin: '10px' }}>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={() => onSendData(input)}>Send to Sibling</button>
    </div>
  );
};

const Sibling2 = ({ data }) => {
  return (
    <div style={{ border: '1px solid orange', padding: '10px', margin: '10px' }}>
      <p>Received from sibling: {data || 'No data yet'}</p>
    </div>
  );
};

// 3. Multiple Levels (Grandparent to Grandchild)
const GrandChild = ({ message }) => {
  return <p>Grandchild got: {message}</p>;
};

const ChildWithGrandchild = ({ message }) => {
  return (
    <div>
      <p>Child message: {message}</p>
      <GrandChild message={`Passed from grandparent: ${message}`} />
    </div>
  );
};

// Main Component
function ComponentCommunication() {
  const [parentMessage, setParentMessage] = useState('Initial message');
  const [siblingData, setSiblingData] = useState('');

  const handleChildEvent = (data) => {
    setParentMessage(data);
  };

  const handleSiblingData = (data) => {
    setSiblingData(data);
  };

  return (
    <div>
      <h3>Component Communication</h3>
      
      <div>
        <h4>Parent to Child:</h4>
        <p>Parent says: {parentMessage}</p>
        <Child 
          message="Hello from Parent!" 
          onChildEvent={handleChildEvent}
        />
      </div>

      <div>
        <h4>Sibling to Sibling:</h4>
        <Sibling1 onSendData={handleSiblingData} />
        <Sibling2 data={siblingData} />
      </div>

      <div>
        <h4>Grandparent to Grandchild:</h4>
        <ChildWithGrandchild message="Passed from Grandparent" />
      </div>
    </div>
  );
}

export default ComponentCommunication;