import React from "react";
import Todo from "../Todo/Todo"
const TodoList = ({ todos, setTodos, filteredTodos, getUser }) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">

                (filteredTodos.length) ? (
                {
                
             
                filteredTodos.map(todo => (
                    <Todo
                        key={todo._id}
                        text={todo.text}
                        todos={todos}
                        todo={todo}
                        setTodos={setTodos}
                        filteredTodos={filteredTodos}

                    />
                ))}):(
                getUser();
                )


            </ul>
        </div>
    );
}

export default TodoList;