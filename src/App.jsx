import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() =>JSON.parse(localStorage.getItem("todos")))
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, checked: false }]);
      setInput("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  };

  return (
    <div className="m-[50px] container p-6 text-center w-[285px] bg-indigo-200  h-auto content-center rounded "  >
      <h1 className="text-3xl text-center  font-semibold font-sans">Todo List</h1>
      <div className="add-todo p-1">
        <input
          type="text"
          className="border-2 border-black text-base "
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button className="ml-1" onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.checked ? "line-through" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => toggleCheck(index)}
            />
            {todo.text}
            <button className="ml-3" onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
