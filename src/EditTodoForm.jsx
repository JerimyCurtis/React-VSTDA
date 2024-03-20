var React = require('react');

var EditTodoForm = React.createClass({
  getInitialState: function() {
    return {
      editText: this.props.todo.text,
      editPriority: this.props.todo.priority
    };
  },

  handleTextChange: function(event) {
    this.setState({ editText: event.target.value });
  },

  handlePriorityChange: function(event) {
    this.setState({ editPriority: event.target.value });
  },

  handleUpdate: function() {
    var updatedTodo = {
      text: this.state.editText,
      priority: this.state.editPriority
    };
    this.props.updateTodo(updatedTodo);
  },

  render: function() {
    return (
      <div className="edit-todo-form card">
        <textarea
          className="update-todo-text"
          value={this.state.editText}
          onChange={this.handleTextChange}
        ></textarea>
        <select
          className="update-todo-priority"
          value={this.state.editPriority}
          onChange={this.handlePriorityChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.handleUpdate}>Save</button>
      </div>
    );
  }
});

module.exports = EditTodoForm;
