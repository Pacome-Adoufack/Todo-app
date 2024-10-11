import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
      })
      // .catch(error => console.error('Error fetching todos:', error));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:8000/api/todos/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          setTodos(prevState => {
            const newTodo = prevState.filter(todo => todo.id !== id);
            return newTodo;
          });
        }
      })
      .catch(error => console.error('Error deleting todo:', error));
  }

  function handleComplete(index) {
    const todo = { ...todos[index] };
    todo.completed = true;
    fetch(`http://localhost:8000/api/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(res => {
        if (res.ok) {
          setTodos(prevTodos => {
            const updatedTodos = [...prevTodos];
            updatedTodos[index] = todo;
            return updatedTodos;
          });
        }
      })
      .catch(error => console.error('Error updating todo:', error));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      name: todoName,
      completed: false,
      id: Math.floor(Math.random() * 10000)
    };
    fetch("http://localhost:8000/api/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => {
        if (res.ok) {
          setTodos(prevState => [...prevState, newTodo]);
          setTodoName("");
        }
      })
      .catch(error => console.error('Error adding todo:', error));
  }

  return (
    <div className='todo-app'>
      <form onSubmit={handleSubmit} className='input-container'>
        <input type="text" id='input-todo' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <button id='add-todo'>Add</button>
      </form>
      <ul className='todo-list, todo-container'>
        {
          todos.map((todo, index) => (
            <li className='todo' key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.name}
              <button className='todo-delete' onClick={() => handleDelete(todo.id)}>Delete</button>
              <button className='todo-edit' onClick={() => handleComplete(index)}>ok</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default App;