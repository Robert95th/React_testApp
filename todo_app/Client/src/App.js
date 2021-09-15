import React, { useState, useEffect } from "react";
import './App.css';
import TodoForm from './components/Form/Form';
import TodoList from './components/TodoList/TodoList';
import LoginForm from "./components/LoginForm/LoginForm";
import Navigation from "./components/Navigation/Navigation";
import Axios from "axios";
import {
  Button, Form, Segment, Header, Icon, Image
}
  from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [inputText, setinputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [updatedDetails, setUpdatedDetails] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [activeItem, setActiveItem] = useState("");


  useEffect(() => {
    filterHandler();
  
  }, [todos, status]);

  useEffect(() => {

    getUser();
  }, []);

  const setUserData = () => {
    setUser({ name: "", email: "" });
  }
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
  const Login = details => {
    Axios({
      method: "POST",
      data: {
        username: details.email,
        password: details.password,
      },
      withCredentials: true,
      url: "http://172.16.48.240:4000/login",
    }).then((res) => {
      setUser(res.data);
      setFilteredTodos(res.data.tasks);
      setTodos(res.data.tasks);
    });
  }
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://172.16.48.240:4000/user",
    }).then((res) => {
      setData(res.data);
      setUser(res.data);
      setTodos(res.data.tasks);
    });
  };
  const Register = details => {

    Axios({
      method: "POST",
      data: {
        username: details.name,
        email: details.email,
        password: details.password,
      },
      withCredentials: true,
      url: "http://172.16.48.240:4000/register",
    }).then((res) => console.log(res));
  }
  const updateDetails = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: updatedDetails.username,
        email: updatedDetails.email,
        _id: user._id,
      },
      withCredentials: true,
      url: "http://172.16.48.240:4000/updateDetils",
    }).then((res) => console.log(res));
  }
  const saveTasks = (e) => {
    console.log(todos);
    e.preventDefault();
    Axios({
      method: "POST",
      data: {

        tasks: todos,
        _id: user._id,
      },
      withCredentials: true,
      url: "http://172.16.48.240:4000/updateList",
    }).then((res) => console.log(res));
  }

  const Logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://172.16.48.240:4000/logout",
    }).then((res) => {
      setUser([]);
    });
  }
  return (
    <Router>
      <div className="App">
        {
          (user != "") ? (
            <div>

              <Navigation
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                Logout={Logout}
              />
              <Route exact path="/">
                <header>
                  <h1>{user.username} Todo Listed</h1>
                </header>
                <Segment compact style={{ margin: "auto", Width: "40%", borderBottom: "1px solid #bfbfbf" }}>
                  <Header as='h2'>
                    <Image circular src='http://172.16.48.240:4000/default.png' /> {user.username} Todo Listed
                  </Header>
                  <TodoForm
                    todos={todos}
                    inputText={inputText}
                    setTodos={setTodos}
                    setinputText={setinputText}
                    setStatus={setStatus}
                    filteredTodos={filteredTodos}
                  />
                  <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    filteredTodos={filteredTodos}
                    style={{ margin: "auto", }}
                    getUser={getUser}
                  />
                  <Button onClick={saveTasks} type='submit' style={{ margin: "auto" }} primary>Save list</Button>
                </Segment>
              </Route>
              <Route path="/profile">
                <Segment compact style={{ margin: "auto" }}>
                  <Header as='h2'>
                    <Icon name='settings' />
                    <Header.Content>
                      Account Settings
                      <Header.Subheader>Manage your preferences</Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Form >
                    <Form.Field style={{ margin: "5px" }}>
                      <input placeholder='Username' onChange={e => setUpdatedDetails({ ...updatedDetails, username: e.target.value })} value={updatedDetails.username} />
                    </Form.Field>
                    <Form.Field style={{ margin: "5px" }}>
                      <input placeholder='Email' onChange={e => setUpdatedDetails({ ...updatedDetails, email: e.target.value })} value={updatedDetails.email} />
                    </Form.Field>
                    <Button onClick={updateDetails} type='submit' style={{ margin: "5px" }} primary floated='right'>Submit</Button>
                  </Form>
                </Segment>
              </Route>


            </div>
          ) : (
            <LoginForm
              Login={Login}
              error={error}
              Register={Register}
              getUser={getUser}
            />
          )
        }
      </div>
    </Router>
  );
}

export default App;
