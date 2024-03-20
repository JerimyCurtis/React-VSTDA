import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      priority: 1,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.todo) {
      this.setState({
        text: this.props.todo.text,
        priority: this.props.todo.priority,
      });
    }
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ text: '', priority: 1 });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          className="create-todo-text"
          value={this.state.text}
          onChange={this.handleTextChange}
          placeholder="What do you need to do?"
          required
        />
        <select
          className="create-todo-priority"
          value={this.state.priority}
          onChange={this.handlePriorityChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    text: PropTypes.string,
    priority: PropTypes.number,
  }),
};

TodoForm.defaultProps = {
  todo: null,
};

export default TodoForm;