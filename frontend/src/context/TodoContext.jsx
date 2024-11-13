import { createContext, useContext, useState } from 'react';

const TodoContext = createContext(null); // Initialize with null

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([
        // Add some initial todos for testing
        { id: 1, title: 'Test Todo', completed: false },
    ]);

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const value = {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error(
            'useTodoContext must be used within a TodoProvider'
        );
    }
    return context;
};
