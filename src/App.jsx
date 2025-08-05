import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState, useEffect, use } from "react";

function App() {
  const [todos, setTodos] = useState([]); // Хранит список задач
  const [filter, setFilter] = useState("all"); // Хранит текущий фильтр задач (все, активные, завершенные)
  const [searchQuery, setSearchQuery] = useState(""); // Хранит текст из поля поиска

  useEffect(() => {                                                                        
    const storedTodos = localStorage.getItem("todos"); 
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []); // При загрузке страницы получаем задачи из localStorage и записываем в todos

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  , [todos]); // Каждый раз когда задачи меняются сохраняем их в localStorage

  function handleAddTodo(newTodo) {
    setTodos((prevTodos) => [...prevTodos, { text: newTodo, completed: false }]);
  }; // Добавляет новую задачу

  function handleDeleteTodo(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }; // Удаляет задачу по индексу

  function handleToggleComplete(index) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }; // Переключает состояние завершенности задачи по индексу (зачеркнут/не зачернут)
  
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
} // Фильтрует задачи по выбранному фильтру и поисковому запросу

function handleEditTodo(index, newText) {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      )
    );
  } // Редактирует текст задачи по индексу

function clearCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
  } // Очищает все завершенные задачи

  return (
      <div className="container">
        <h1>Мои задачи</h1>
        <TodoForm onAddTodo={handleAddTodo} className="todo-form" />
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
            placeholder="Поиск" 
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
          className="todo-list" 
        />
        {todos.some(todo => todo.completed) && (
          <div className="completed-button">
            <button className="clear-completed" onClick={clearCompletedTodos}>
              Очистить завершенные
            </button>
          </div>
        )}
      </div>
  );
};

export default App;