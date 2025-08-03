import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect, use } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
  let filtered = todos;

  if (filter === "active") {
    filtered = todos.filter(todo => !todo.completed);
  } else if (filter === "completed") {
    filtered = todos.filter(todo => todo.completed);
  }

  if (searchQuery.trim()) {
    filtered = filtered.filter(todo =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
}

function handleEditTodo(index, newText) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      )
    );
  }

function clearCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
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
          <input 
            type="text" 
            placeholder="Поиск..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <TodoList 
          todos={getFilteredTodos()} 
          onDelete={handleDeleteTodo} 
          onToggle={handleToggleComplete}
          onEdit={handleEditTodo} 
        />
        {todos.some(todo => todo.completed) && (
          <button className="clear-completed" onClick={clearCompletedTodos}>
            Очистить завершенные
          </button>
        )}
      </div>
  );
};

export default App;