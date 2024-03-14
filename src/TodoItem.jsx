var React = require('react');

var TodoItem = React.createClass({
  render: function() {
    var todo = this.props.todo;
    return (
      <div className="todo-item">
        <span className="todo-text">{todo.text}</span>
        <span className="todo-priority">{todo.priority}</span>
        <button className="edit-todo">Edit</button>
        <button className="delete-todo">Delete</button>
      </div>
    );
  }
});

module.exports = TodoItem;
