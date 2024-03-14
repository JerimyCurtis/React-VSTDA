import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: this.props.todo.text,
      editPriority: this.props.todo.priority,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditPriorityChange = this.handleEditPriorityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleEditChange(event) {
    this.setState({ editText: event.target.value });
  }

  handleEditPriorityChange(event) {
    this.setState({ editPriority: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateTodo(this.props.todo.id, this.state.editText, this.state.editPriority);
    this.toggleEdit();
  }

  render() {
    const { todo, deleteTodo } = this.props;
    if (this.state.isEditing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <textarea className="update-todo-text" value={this.state.editText} onChange={this.handleEditChange} />
          <select className="update-todo-priority" value={this.state.editPriority} onChange={this.handleEditPriorityChange}>
            <option value="1">Low Priority</option>
            <option value="2">Medium Priority</option>
            <option value="3">High Priority</option>
          </select>
          <button type="submit" className="update-todo">Save</button>
        </form>
      );
    }

    return (
      <div>
        <span>{todo.text}</span>
        <button onClick={this.toggleEdit} className="edit-todo">Edit</button>
        <button onClick={() => deleteTodo(todo.id)} className="delete-todo">Delete</button>
      </div>
    );
  }
}

export default TodoItem;
