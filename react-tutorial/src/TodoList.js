import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: true }
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { 
          id: Date.now(), 
          text: newTodo, 
          completed: false 
        }
      ]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      <h3>Todo List</h3>
      
      {/* Adding new todo */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Rendering list with keys */}
      <ul>
        {todos.length === 0 ? (
          <p>No todos yet!</p>
        ) : (
          todos.map((todo) => (
            // Key should be unique and stable (use IDs, not index)
            <li key={todo.id} style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              margin: '5px 0'
            }}>
              <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* If you must use index as key (not recommended for dynamic lists) */}
      {/* {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>
      ))} */}
    </div>
  );
}

export default TodoList;