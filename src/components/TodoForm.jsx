import { useState } from 'react';

function TodoForm({ onAddTodo, className }) {
    const [inputValue, setInputValue] = useState(""); // Хранит текст который вводит пользователь

    function handleInputChange(event) {
        setInputValue(event.target.value);
    } // Обновляет текстовое поле при вводе

    function handleSubmit() {
        if(inputValue.trim()) {
            onAddTodo(inputValue);
            setInputValue("");
        }
    } // Добавляет новую задачу и очищает поле ввода

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    } // Позволяет добавлять задачу по нажатию Enter

    return (
        <div className={className}>
            <input 
                value={inputValue} 
                onChange={handleInputChange} 
                onKeyDown={handleKeyDown} 
                type="text" 
                placeholder="Введите задачу"
            />
            <button onClick={handleSubmit}>Добавить задачу</button>
        </div>
    )
};

export default TodoForm;