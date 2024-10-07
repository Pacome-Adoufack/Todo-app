import { useState, useEffect } from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import TodoInput from './components/TodoInput';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network request failed: ' + response.statusText);
        }
      })
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title: title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleCompletion={toggleCompletion} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;