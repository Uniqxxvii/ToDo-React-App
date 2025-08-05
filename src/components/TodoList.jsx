import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle, onEdit, className }) {
  return (
    <div className={className}>
      <ul>
        {todos.map((todo, index) => ( // Проходим по каждому элементу массива todos и создаем TodoItem
          <TodoItem 
              key={index} 
              text={todo.text}
              completed={todo.completed} 
              onDelete={() => onDelete(index)}
              onToggle={() => onToggle(index)}
              onEdit={(newText) => onEdit(index, newText)} 
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;