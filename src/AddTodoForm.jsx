import React, { Component } from 'react';

class AddTodoForm extends Component {
  state = {
    todoText: '',
    priority: '1',
  };

  handleInputChange = (event) => {
    this.setState({
      todoText: event.target.value,
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      priority: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.todoText, this.state.priority);
    this.setState({ todoText: '', priority: '1' }); // Reset form
  };

  render() {
    return (
      <form className="add-todo-form" onSubmit={this.handleSubmit}>
        <textarea 
          className="create-todo-text" 
          value={this.state.todoText} 
          onChange={this.handleInputChange} 
          required
        />
        <select 
          className="create-todo-priority" 
          value={this.state.priority} 
          onChange={this.handleSelectChange}
        >
          <option value="1">Low Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">High Priority</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

export default AddTodoForm;
