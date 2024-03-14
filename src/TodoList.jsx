var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({
  render: function() {
    var todoItems = this.props.todos.map(function(todo, index) {
      return <TodoItem key={index} todo={todo} />;
    });
    return (
      <div className="todo-list">
        {todoItems}
      </div>
    );
  }
});

module.exports = TodoList;
