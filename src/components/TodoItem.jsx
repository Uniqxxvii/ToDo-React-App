import { useState } from "react";

function TodoItem({ text, completed, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false); // Состояние для отслеживания режима редактирования
  const [editText, setEditText] = useState(text); // Состояние для хранения текста при редактировании
    return (
    <li className={completed ? "completed todo-item" : "todo-item"}>
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit(editText);
          }} // Сохраняет изменения при потере фокуса
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              onEdit(editText);
            }
          }} // Позволяет сохранить изменения по нажатию Enter
          autoFocus
        /> // Поле ввода для редактирования текста задачи
      ) : (
        <span className="todo-text" onClick={onToggle}>
          {text}
        </span>
      )}
      <div className="edit-delete-buttons">
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation(); // чтобы не вызвалось onToggle
            setIsEditing(true);
          }}
        >
          ✏️
        </button>

        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ✖️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;