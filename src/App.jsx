import React, { Component } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

ReactDOM.render(<App />, document.getElementById('root'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  addTodo(todoText, priority) {
    const newTodo = {
      id: Date.now(),
      text: todoText,
      priority,
      isCompleted: false,
    };
    this.setState({
      todos: this.state.todos.concat(newTodo),
    });
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  }

  updateTodo(id, updatedText, updatedPriority) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          // Using Object.assign to replace the spread operator
          return Object.assign({}, todo, { text: updatedText, priority: updatedPriority });
        }
        return todo;
      }),
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Very Simple Todo App</h1>
        <h2>Track all of the things</h2>
        <div className="row">
          <AddTodoForm addTodo={this.addTodo} />
          <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo} />
        </div>
      </div>
    );
  }
}

export default App;
