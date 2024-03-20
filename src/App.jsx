var React = require('react');
var TodoForm = require('./TodoForm');
var TodoList = require('./TodoList');
var EditTodoForm = require('./EditTodoForm');

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      editTodoIndex: -1
    };
  },

  handleAddTodo: function(newTodo) {
    this.setState(function(prevState) {
      return {
        todos: prevState.todos.concat(newTodo)
      };
    });
  },

  handleEditTodo: function(index) {
    this.setState({ editTodoIndex: index });
  },

  handleUpdateTodo: function(updatedTodo) {
    this.setState(function(prevState) {
      var updatedTodos = prevState.todos.slice();
      updatedTodos[prevState.editTodoIndex] = updatedTodo;
      return {
        todos: updatedTodos,
        editTodoIndex: -1
      };
    });
  },

  handleDeleteTodo: function(index) {
    this.setState(function(prevState) {
      return {
        todos: prevState.todos.filter(function(_, i) { return i !== index; }),
        editTodoIndex: prevState.editTodoIndex === index ? -1 : prevState.editTodoIndex // Reset editTodoIndex if the deleted todo is the one being edited
      };
    });
  },

  handleToggleComplete: function(index) {
    this.setState(function(prevState) {
      var updatedTodos = prevState.todos.slice();
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return {
        todos: updatedTodos
      };
    });
  },

  render: function() {
    return (
      <div className="App">
        <TodoForm addTodo={this.handleAddTodo} /> {/* Render TodoForm component */}
        <TodoList
          todos={this.state.todos}
          editTodo={this.handleEditTodo}
          deleteTodo={this.handleDeleteTodo}
          toggleComplete={this.handleToggleComplete}
        />
        {this.state.editTodoIndex !== -1 && (
          <EditTodoForm
            todo={this.state.todos[this.state.editTodoIndex]}
            updateTodo={this.handleUpdateTodo}
          />
        )}
      </div>
    );
  }
});

module.exports = App;
