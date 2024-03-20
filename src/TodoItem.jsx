import React from 'react';
import PropTypes from 'prop-types';
import EditTodoForm from './EditTodoForm';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleEditClick() {
    this.setState({ isEditing: true });
  }

  handleEditFormSubmit(updatedText) {
    if (updatedText.trim()) {
      this.props.editTodo(this.props.index, updatedText);
    }
    this.setState({ isEditing: false });
  }

  handleDeleteClick() {
    this.props.deleteTodo(this.props.index);
  }

  render() {
    const { todo, toggleComplete } = this.props;
    const { isEditing } = this.state;

    return (
      <li className={`todo-item ${todo.completed ? 'is-complete' : ''}`}>
        {isEditing ? (
          <EditTodoForm
            todo={todo}
            onFormSubmit={this.handleEditFormSubmit}
          />
        ) : (
          <div className="todo-item-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(this.props.index)}
            />
            <span className="todo-item-text">{todo.text}</span>
          </div>
        )}
        <div className="todo-item-actions">
          {isEditing ? (
            <button onClick={this.handleEditFormSubmit}>Save</button>
          ) : (
            <button onClick={this.handleEditClick}>Edit</button>
          )}
          <button onClick={this.handleDeleteClick}>Delete</button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;