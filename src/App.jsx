// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DatePicker from './components/DatePicker';
import './app.css';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date in YYYY-MM-DD format
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    // Update local storage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    const newTodo = { ...todo, date: selectedDate, id: Date.now() }; // Adding unique id and selectedDate to todo
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id, updatedFields) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Filter todos based on selectedDate, searchTerm, and filterPriority
  const filteredTodos = todos.filter((todo) =>
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
