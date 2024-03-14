import React, { Component } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  addTodo = (todoText, priority) => {
    const newTodo = {
      id: Date.now(), // Simple unique ID, consider a better ID for a real app
      text: todoText,
      priority,
      isCompleted: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  };

  toggleCompletion = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      }),
    });
  };

  updateTodo = (id, updatedText, updatedPriority) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, text: updatedText, priority: updatedPriority };
        }
        return todo;
      }),
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Very Simple Todo App</h1>
        <h2>Track all of the things</h2>
        <div className="row">
          <AddTodoForm addTodo={this.addTodo} />
          <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} toggleCompletion={this.toggleCompletion} updateTodo={this.updateTodo} />
        </div>
      </div>
    );
  }
}

export default App;
