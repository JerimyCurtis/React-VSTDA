import React, { Component } from 'react';

class TodoItem extends Component {
  state = {
    isEditing: false,
    editText: this.props.todo.text,
    editPriority: this.props.todo.priority,
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo.id);
  };

  handleSave = (e) => {
    e.preventDefault();
    this.props.updateTodo(
      this.props.todo.id, 
      this.state.editText, 
      this.state.editPriority
    );
    this.setState({ isEditing: false });
  };

  handleChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handlePriorityChange = (e) => {
    this.setState({ editPriority: e.target.value });
  };

  renderEditForm() {
    return (
      <form onSubmit={this.handleSave}>
        <textarea 
          className="update-todo-text" 
          value={this.state.editText} 
          onChange={this.handleChange}
        />
        <select 
          className="update-todo-priority" 
          value={this.state.editPriority} 
          onChange={this.handlePriorityChange}
        >
          <option value="1">Low Priority</option>
          <option value="2">Medium Priority</option>
          <option value="3">High Priority</option>
        </select>
        <button className="update-todo" type="submit">Save</button>
      </form>
    );
  }

  renderTodo() {
    const { text, priority, isCompleted } = this.props.todo;
    return (
      <div className={`todo-item priority-${priority}`} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {text}
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

  render() {
    return this.state.isEditing ? this.renderEditForm() : this.renderTodo();
  }
}

export default TodoItem;
