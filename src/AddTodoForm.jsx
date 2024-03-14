import React, { Component } from 'react';

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: '',
      priority: '1',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ todoText: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ priority: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTodo(this.state.todoText, this.state.priority);
    this.setState({ todoText: '', priority: '1' }); // Reset form after submission
  }

  render() {
    return (
      <form className="add-todo-form" onSubmit={this.handleSubmit}>
        <textarea
          className="create-todo-text"
          value={this.state.todoText}
          onChange={this.handleInputChange}
          required />
        <select
          className="create-todo-priority"
          value={this.state.priority}
          onChange={this.handleSelectChange}>
          <option value="1">Low Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">High Priority</option>
        </select>
        <button type="submit" className="create-todo">Add Todo</button>
      </form>
    );
  }
}

export default AddTodoForm;
