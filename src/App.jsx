import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect, use } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

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
  
  function getFilteredTodos() {
    if (filter === "active") return todos.filter(todo => !todo.completed);
    if (filter === "completed") return todos.filter(todo => todo.completed);
    return todos;
  }

  return (
      <div>
        <h1>Мои задачи</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <div className="filters">
          <button 
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Все
          </button>
          <button 
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Активные
          </button>
          <button 
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Завершенные
          </button> 
        </div>
        <TodoList todos={getFilteredTodos()} onDelete={handleDeleteTodo} onToggle={handleToggleComplete} />
      </div>
  );
};

export default App;