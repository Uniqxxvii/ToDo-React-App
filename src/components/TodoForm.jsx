import { useState } from 'react';

function TodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit() {
        if(inputValue.trim()) {
            onAddTodo(inputValue);
            setInputValue("");
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <div>
            <input value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} type="text" placeholder="Введите задачу"/>
            <button onClick={handleSubmit}>Добавить задачу</button>
        </div>
    )
};

export default TodoForm;