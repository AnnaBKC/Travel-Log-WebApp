import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';


function Login({ changeLogStatus }) {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [numTries, setNumTries] = useState(0);
    let navigate = useNavigate();
    const isLogged = (localStorage.isLogged === 'true');


    const formStyle = {
        padding: '3%',
        backgroundColor: 'white',

    };
    const containerStyle = {
        textAlign: 'left',
        padding: '3%',
    }

    const updatePw = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const updateUsername = (e) => {
        e.preventDefault();
        setUsername(e.target.value);
    }

    const loginAuth = (e) => {
        e.preventDefault();
        console.log(username);
        Axios.post("http://localhost:5000/loginAuth", {
            username,
            password,
        }).then((resp) => {
            if (resp.status === 200) {
                alert("Successfully logged in!");
                changeLogStatus(username);
                setNumTries(0);
                navigate('../Home');
            }
        }).catch((error) => {
            setNumTries(1);
            changeLogStatus(null);
        });
    }

    useEffect(() => {
        if (isLogged === true) {
            navigate('../');
        }
    })

    return (
        <>
            {
                isLogged ? <div></div> :
                    (<div>
                        {
                            numTries > 0 && <p style={{ color: "red" }}>Incorrect Password or Username, try again</p>
                        }
                        <Container fluid style={containerStyle}>
                            <Form style={formStyle}>
                                <Row>
                                    <Col >
                                    </Col>
                                    <Col xs={4} >
                                        <Form.Group>

                                            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }} > Login Page</h1>
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>

                                <Row>
                                    <Col >
                                    </Col>
                                    <Col xs={4} >
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Username"
                                                name="username"
                                                onChange={updateUsername}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>

                                <Row>
                                    <Col >
                                    </Col>
                                    <Col xs={4} >
                                        <Form.Group>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                onChange={updatePw}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>
                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }}>


                                    <Button size='sm' onClick={loginAuth}>
                                        login
                                    </Button>
                                </span>
                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
                                    <a> Don't have an account?</a>  </p>
                                <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1vh' }}>
                                    <a href="/Register" >  Register</a>
                                </p>


                            </Form >
                        </Container >
                    </div >
                    )
            }
        </>
    );
}

export default Login
