import React from 'react'
import { useState } from 'react';
import backgroundIMG from '../images/tasks.png';

import {
    Button,
    Icon,
    Divider,
    Grid,
    Input,
    Segment,
    Image,
    Header
}
from 'semantic-ui-react';


function LoginForm({ Login, error, Register, getUser }) {

    const [regDetails, setRegDetails] = useState({ name: "", email: "", password: "" });
    const [loginDetails, setLogInDetails] = useState({ email: "", password: "" });

    const registerHandler = e => {
        e.preventDefault();
        Register(regDetails);
    }

    const loginHandler = e => {
        e.preventDefault();
        Login(loginDetails);
    }


    const getUserHandler = e => {
        e.preventDefault();
        getUser(getUser);
    }
    return (
        <div style={{ padding: " 10%" }}>
            <Segment placeholder >
                <Image src={backgroundIMG} size='small' rounded centered style={{ marginBottom: " 10%" }} />
                <Grid columns={2} stackable textAlign='center' >
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                            <form className="" >
                                <div className="form-inner user-container">
                                    <Header as='h2' >
                                        <Header.Content>Register</Header.Content>
                                    </Header>
                                    {/* */}
                                    <div className="form-group">
                                        <Input fluid placeholder='Username' style={{ marginBottom: "5px" }}>
                                            <input type="text" name="name" id="name" onChange={e => setRegDetails({ ...regDetails, name: e.target.value })} value={regDetails.name} />
                                        </Input>
                                    </div>

                                    <div className="form-group">
                                        <Input fluid placeholder='Email' style={{ marginBottom: "5px" }}>
                                            <input type="email" name="email" id="email" onChange={e => setRegDetails({ ...regDetails, email: e.target.value })} value={regDetails.email} />
                                        </Input>
                                    </div>
                                    <div className="form-group">
                                        <Input fluid placeholder='Password' style={{ marginBottom: "5px" }}>
                                            <input type="password" name="password" id="password" onChange={e => setRegDetails({ ...regDetails, password: e.target.value })} value={regDetails.password} />
                                        </Input>

                                    </div>
                                    <Button type="submit" onClick={registerHandler} value="Login" primary>Submit</Button>
                                </div>
                            </form>
                        </Grid.Column>
                        <Grid.Column>
                            <form className="" >
                                <div className="form-inner user-container">
                                    <Header as='h2' >
                                        <Header.Content>Login</Header.Content>
                                    </Header>
                                    <div className="form-group">
                                        <Input fluid placeholder='Email' style={{ marginBottom: "5px" }}>
                                            <input type="email" name="email" id="email" onChange={e => setLogInDetails({ ...loginDetails, email: e.target.value })} value={loginDetails.email} />
                                        </Input>
                                    </div>
                                    <div className="form-group">
                                        <Input fluid placeholder='Password' style={{ marginBottom: "5px" }}>
                                            <input type="password" name="password" id="password" onChange={e => setLogInDetails({ ...loginDetails, password: e.target.value })} value={loginDetails.password} />
                                        </Input>
                                    </div>
                                    <Button type="submit" onClick={loginHandler} value="Login" primary>Submit</Button>
                                    <Button type="submit" onClick={getUserHandler} value="Get user" primary>get user</Button>


                                </div>
                            </form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </div>

    )
}

export default LoginForm;
