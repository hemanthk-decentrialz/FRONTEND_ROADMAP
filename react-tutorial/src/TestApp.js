// File: src/TestApp.js
import React, { useState } from 'react';
import JSXExample from './JSXExample';
import ClassComponent from './ClassComponent';
import FunctionalComponent from './FunctionalComponent';
import { Greeting, Welcome } from './Greeting';
import UserCard from './UserCard';
import Counter from './Counter';
import EventDemo from './EventDemo';
import ConditionalRender from './ConditionalRender';
import TodoList from './TodoList';
import UseStateDemo from './UseStateDemo';
import UseEffectDemo from './UseEffectDemo';
import UseRefDemo from './UseRefDemo';
import UseMemoDemo from './UseMemoDemo';
import UseCallbackDemo from './UseCallbackDemo';
import UseContextDemo from './UseContextDemo';
import FormDemo from './FormDemo';
import ComponentCommunication from './ComponentCommunication';
import ContextWrapper from './ContextWrapper';
import ApiIntegration from './ApiIntegration';
import LoadingStates from './LoadingStates';
import ErrorHandlingDemo from './ErrorHandling';

function TestApp() {
  const [currentComponent, setCurrentComponent] = useState('Introduction');
  
  const components = {
    'Introduction': (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🚀 Welcome to React Tutorial!</h1>
        <p>Click any button below to explore different React concepts</p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Total: 20+ topics covered with live examples
        </p>
      </div>
    ),
    
    '1. JSX': <JSXExample />,
    
    '2. Class Component': <ClassComponent />,
    '3a. Functional Component': <FunctionalComponent />,
    '3b. Arrow Functional Component': <Greeting/>,
    '3c. Welcome': <Welcome/>,
    
    '4. Props': (
      <div style={{ padding: '10px' }}>
        <h3>User Cards with Props</h3>
        <UserCard name="Alice" age={25} email="alice@email.com" isAdmin={true} />
        <UserCard name="Bob" age={30} email="bob@email.com" />
        <UserCard /> {/* Uses default props */}
      </div>
    ),
    
    '5. State': <Counter />,
    
    '6. Events': <EventDemo />,
    
    '7. Conditional Rendering': <ConditionalRender />,
    
    '8. Lists & Keys': <TodoList />,
    
    '9. useState': <UseStateDemo />,
    '10. useEffect': <UseEffectDemo />,
    '11. useRef': <UseRefDemo />,
    '12. useMemo': <UseMemoDemo />,
    '13. useCallback': <UseCallbackDemo />,
    '14. useContext': <UseContextDemo />,
    
    '15. Forms': <FormDemo />,
    
    '16. Component Communication': <ComponentCommunication />,
    
    '17. Context API': <ContextWrapper />,
    '18. API Integration': <ApiIntegration />,
    
    '19. Loading States': <LoadingStates />,
    
    '20. Error Handling': <ErrorHandlingDemo />
  };

  // Get component names for the buttons
  const componentNames = Object.keys(components);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0 }}>🎯 React Tutorial - All Topics</h1>
        <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>
          Click any topic below to see live examples
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
          {componentNames.length} topics covered
        </p>
      </div>

      {/* Topic Navigation */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '8px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #e0e0e0'
      }}>
        {componentNames.map((name) => (
          <button
            key={name}
            onClick={() => setCurrentComponent(name)}
            style={{
              padding: '6px 14px',
              backgroundColor: currentComponent === name ? '#2196F3' : 'white',
              color: currentComponent === name ? 'white' : '#333',
              border: currentComponent === name ? '2px solid #2196F3' : '1px solid #ccc',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: currentComponent === name ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (currentComponent !== name) {
                e.target.style.backgroundColor = '#e3f2fd';
                e.target.style.borderColor = '#2196F3';
              }
            }}
            onMouseLeave={(e) => {
              if (currentComponent !== name) {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#ccc';
              }
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Component Display Area */}
      <div style={{ 
        border: '2px solid #2196F3',
        borderRadius: '8px',
        padding: '20px',
        minHeight: '400px',
        backgroundColor: 'white',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '20px',
          backgroundColor: 'white',
          padding: '0 10px',
          color: '#2196F3',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {currentComponent}
        </div>
        <div style={{ marginTop: '10px' }}>
          {components[currentComponent]}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', display: 'block' }}>📚</span>
          <strong>{componentNames.length}</strong>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Topics</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', display: 'block' }}>⚛️</span>
          <strong>React</strong>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Hooks & Components</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', display: 'block' }}>🎨</span>
          <strong>Context API</strong>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>State Management</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '24px', display: 'block' }}>🔌</span>
          <strong>API Integration</strong>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>REST APIs</p>
        </div>
      </div>

      {/* Navigation Tips */}
      <div style={{
        marginTop: '15px',
        padding: '12px',
        backgroundColor: '#fff3e0',
        borderRadius: '8px',
        borderLeft: '4px solid #ff9800',
        fontSize: '13px'
      }}>
        <p style={{ margin: 0 }}>
          <strong>💡 Tip:</strong> Scroll through topics using the navigation bar above. 
          Each topic demonstrates a specific React concept with live, interactive examples.
        </p>
      </div>
    </div>
  );
}

export default TestApp;