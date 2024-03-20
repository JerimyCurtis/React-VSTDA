import React from 'react';
var TodoItem = require('./TodoItem');

const TodoList = ({ todos, editTodo, deleteTodo, toggleComplete }) => {
  return (
    <div className="view-todos card">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

module.exports = TodoList;
