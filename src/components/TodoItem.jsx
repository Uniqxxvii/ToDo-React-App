function TodoItem({ text, completed, onDelete, onToggle }) {
  return (
    <li
      className={completed ? "completed todo-item" : "todo-item"}
      onClick={onToggle}
    >
      <span className="todo-text">{text}</span>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation(); // чтобы не вызвать onToggle
          onDelete();
        }}
      >
        ✖️
      </button>
    </li>
  );
}


export default TodoItem;