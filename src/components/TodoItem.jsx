// src/components/TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  // Function to format the date as 'Day, MM/DD/YY'
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    updateTodo(todo.id, {
      text: editedText,
      isEditing: false,
    });
    setIsEditing(false);
  };

  // Determine priority label class based on todo priority
  const priorityClass = `priority-label priority-${todo.priority === '1' ? 'high' : todo.priority === '2' ? 'medium' : 'low'}`;

  return (
    <li className={`todo-item ${priorityClass}`}>
      <div>
        <span className={priorityClass}>
          {todo.priority === '1' ? 'High' : todo.priority === '2' ? 'Medium' : 'Low'}
        </span>
        <button onClick={() => setIsEditing(true)} className="edit-todo">Edit</button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-todo">Delete</button>
      </div>
      {isEditing ? (
        <>
          <textarea
            className="update-todo-text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave} className="update-todo">Save</button>
        </>
      ) : (
        <div className="todo-item-content">
          <span className="date-display">{formatDate(todo.date)}:</span> {todo.text}
        </div>
      )}
    </li>
  );
}

export default TodoItem;
