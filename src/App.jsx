import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect, use } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  , [todos]);

  function handleAddTodo(newTodo) {
    setTodos((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
  };

  function handleDeleteTodo(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  function handleToggleComplete(index) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }; 

  return (
      <div>
        <h1>Мои задачи</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoList todos={todos} onDelete={handleDeleteTodo} onToggle={handleToggleComplete} />
      </div>
  );
};

export default App;