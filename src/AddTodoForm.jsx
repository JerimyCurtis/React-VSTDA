var React = require('react');

var AddTodoForm = React.createClass({
  getInitialState: function() {
    return {
      todoText: '',
      priority: '1' // Default priority set to 'Low'
    };
  },
  handleTodoTextChange: function(event) {
    this.setState({ todoText: event.target.value });
  },
  handlePriorityChange: function(event) {
    this.setState({ priority: event.target.value });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var todo = {
      text: this.state.todoText,
      priority: this.state.priority
    };
    this.props.addTodo(todo);
    this.setState({ todoText: '', priority: '1' }); // Clear input fields after submitting
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea className="create-todo-text" value={this.state.todoText} onChange={this.handleTodoTextChange}></textarea>
        <select className="create-todo-priority" value={this.state.priority} onChange={this.handlePriorityChange}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button type="submit" className="create-todo">Add Todo</button> {/* Fix class name to 'create-todo' */}
      </form>
    );
  }
});

module.exports = AddTodoForm;
