import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem 
            key={index} 
            text={todo.text}
            completed={todo.completed} 
            onDelete={() => onDelete(index)}
            onToggle={() => onToggle(index)} 
        />
      ))}
    </ul>
  );
}

export default TodoList;