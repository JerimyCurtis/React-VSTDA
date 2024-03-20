// src/components/TodoItem.jsx
import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    updateTodo({
      ...todo,
      text: editedText,
      isEditing: false,
    });
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.priority === '1' ? 'high' : todo.priority === '2' ? 'medium' : 'low'}`}>
      {isEditing ? (
        <>
          <textarea
            className="update-todo-text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEdit} className="update-todo">Save</button>
        </>
      ) : (
        <>
          {todo.text}
          <button onClick={() => setIsEditing(true)} className="edit-todo">Edit</button>
          <button onClick={() => deleteTodo(todo.id)} className="delete-todo">Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
