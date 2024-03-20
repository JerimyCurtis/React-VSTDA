// src/components/TodoForm.jsx
import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      id: Date.now(),
      text,
      priority,
      isEditing: false,
    });
    setText('');
    setPriority('1');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="create-todo-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="create-todo-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <button type="submit" className="create-todo">Add Todo</button>
    </form>
  );
}

export default TodoForm;
