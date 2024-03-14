var React = require('react');
var ReactDOM = require('react-dom');
var AddTodoForm = require('./AddTodoForm');
var TodoList = require('./TodoList');

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: []
    };
  },
  addTodo: function(todo) {
    this.setState(function(prevState) {
      return {
        todos: prevState.todos.concat([todo])
      };
    });
  },
  render: function() {
    return (
      <div>
        <h1>Very Simple To Do App</h1>
        <AddTodoForm addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

module.exports = App;
