// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DatePicker from './components/DatePicker'; // Import DatePicker
import './app.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // State for managing selected date
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterPriority, setFilterPriority] = useState(""); // State for filter priority

  useEffect(() => {
    // Load todos from localStorage on initial render
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = { ...todo, date: selectedDate }; // Ensure each todo has a date property
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos based on selectedDate, search term, and filter priority
  const filteredTodos = todos.filter(todo =>
    todo.date === selectedDate &&
    todo.text.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterPriority ? todo.priority === filterPriority : true)
  );

  return (
    <div className="app">
      <div className="input-panel">
        <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="">Filter by Priority</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="display-panel">
        <TodoList todos={filteredTodos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
