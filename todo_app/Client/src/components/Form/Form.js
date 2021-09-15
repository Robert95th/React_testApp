import React from "react";
import { Input, Button, Icon } from 'semantic-ui-react';
import uniqid from 'uniqid';

const Form = ({ setinputText, setTodos, todos, inputText, setStatus }) => {

    const inputTextHandler = (e) => {
        setinputText(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, { text: inputText, completed: false, id: uniqid() }
        ]);
        setinputText("");
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }
    return (
        <form>
            <Input fluid placeholder='Task name' style={{  minWidth: "300px" }}>
                <input
                    value={inputText}
                    onChange={inputTextHandler}
                    type="text"
                    className="todo-input" />
            </Input>
            <Button color='orange' icon onClick={submitHandler} type="submit">
                <Icon name='plus square' />
            </Button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}

export default Form;