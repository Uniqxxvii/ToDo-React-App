import { useState } from "react";

function TodoItem({ text, completed, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
    return (
    <li className={completed ? "completed todo-item" : "todo-item"}>
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit(editText);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsEditing(false);
              onEdit(editText);
            }
          }}
          autoFocus
        />
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