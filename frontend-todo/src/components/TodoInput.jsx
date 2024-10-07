import { useState } from 'react';

function TodoInput({ addTodo }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        id="input-todo"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo"
        required
      />
      <button id="add-todo" type="submit">+</button>
    </form>
  );
}

export default TodoInput;