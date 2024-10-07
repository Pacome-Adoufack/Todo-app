import React from 'react';

const TodoList = ({ todos, toggleCompletion, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-info">
            <input
              className="todo-completed"
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            />
            <p className="todo-name">{todo.title}</p>
          </div>
          <div className="todo-btn">
            <button className="todo-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;