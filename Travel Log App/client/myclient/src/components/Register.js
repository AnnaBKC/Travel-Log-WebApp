import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';


function Register() {
    const isLogged = (localStorage.isLogged === 'true');
    const link = '<insert_github_link>'
    const navigate = useNavigate();

    const [listOfUsers, setListOfUsers] = useState([]);
    const [first_name, setfirstName] = useState("");
    const [last_name, setlastName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formStyle = {
        padding: '3%',
        backgroundColor: 'white',

    };
    const containerStyle = {
        textAlign: 'left',
        padding: '3%',
    }


    useEffect(() => {
        Axios.get("http://localhost:5000/getUsers").then((response) => {
            setListOfUsers(response.data);
        });
    }, []);

    const createUser = () => {
        console.log(first_name + last_name)
        Axios.post("http://localhost:5000/createUser", {
            first_name,
            last_name,
            age,
            email,
            username,
            password,
        }).then((response) => {
            if (response.status === 200) {
                alert("Successfully created the account!");
                setListOfUsers([
                    ...listOfUsers,
                    {
                        first_name,
                        last_name,
                        age,
                        email,
                        username,
                        password,
                    },
                ]);
                navigate('../Login');
            }
            else {
                console.log("not working...")
            }

        });
    };

    useEffect(() => {
        if (isLogged === true) {
            navigate('../');
        }
    })

    return (

        <>
            {
                isLogged ? <div></div> :
                    <div className="Register">

                        <div className="usersDisplay">
                            {listOfUsers.map((user) => {
                                return (
                                    <div>
                                    </div>
                                );
                            })}
                        </div>
                        <Container fluid style={containerStyle}>
                            <Form style={formStyle}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                    <h2>Registration</h2>
                                </div>

                                <Row >
                                    <Col >
                                    </Col>
                                    <Col xs={4} >
                                        <Form.Group>
                                            <Form.Control type="text" placeholder="First Name" onChange={(event) => {
                                                setfirstName(event.target.value);
                                            }} />
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
                                            <Form.Control type="text" placeholder="Last Name" onChange={(event) => {
                                                setlastName(event.target.value);
                                            }} />
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
                                            <Form.Control type="text" placeholder="Age" onChange={(event) => {
                                                setAge(event.target.value);
                                            }} />
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
                                            <Form.Control type="text" placeholder="Email" onChange={(event) => {
                                                setEmail(event.target.value);
                                            }} />
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
                                            <Form.Control type="text" placeholder="Username" onChange={(event) => {
                                                setUsername(event.target.value);
                                            }} />
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
                                            <Form.Control type="password" placeholder="Password" onChange={(event) => {
                                                setPassword(event.target.value);
                                            }} />
                                        </Form.Group>
                                    </Col>
                                    <Col >
                                    </Col>
                                </Row>

                                <br></br>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                    <Button onClick={createUser}> Sign Up </Button>

                                </div>

                            </Form>
                        </Container>
                    </div>
            }
        </>
    );
}

export default Register;
