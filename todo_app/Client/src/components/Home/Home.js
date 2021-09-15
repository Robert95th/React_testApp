import React, { useState, useEffect } from "react";
import Form from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';

const Home = () => {
    useEffect(() => {
        filterHandler();
    }, [todos, status]);



    const filterHandler = () => {
        switch (status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.completed === true));
                break
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.completed === false));
                break

            default:
                setFilteredTodos(todos);
                break
        }
    }
    const [inputText, setinputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);

    return (
        <div>
            <Form />
            <TodoList />
        </div>

    )

}
export default Home;