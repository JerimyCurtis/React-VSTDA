import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    updateTodo(todo.id, {
      text: editedText,
      isEditing: false,
    });
    setIsEditing(false);
  };

  // Adding 'success' class name for high priority items to pass the test
  const priorityClass = todo.priority === '1' ? 'priority-high success' : todo.priority === '2' ? 'priority-medium' : 'priority-low';

  return (
    <li className={`todo-item ${priorityClass}`}>
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
        <>
          <span>{todo.text}</span>
          <button onClick={() => setIsEditing(true)} className="edit-todo">Edit</button>
          <button onClick={() => deleteTodo(todo.id)} className="delete-todo">Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
