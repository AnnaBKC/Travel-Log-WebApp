import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Recommend_dial from './Recommend_dial';
import Home from './Home';
import Axios from "axios";

function Submit_post({currUser}) {
    let navigate = useNavigate(); 
    const [title, setBlogTitle] = useState("");
    const [tripCost, setTripCost] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [location, setLocation] = useState("");
    const [recom, setRecom] = useState('True');
    const [uploadFile, setUploadFile] = useState('');
    
    const formStyle = {
        padding: '3%',
        backgroundColor: 'white',
    };

    const containerStyle = {
        textAlign: 'left',
        padding: '3%',
    }

    const headerStyle = {
        borderBottom: '1px solid gray',
        marginBottom: '1%',
    }

    const readFile = (e) => {
        setUploadFile(e.target.files[0]);
    }

    const submitPost = (e) => {
        e.preventDefault();
        let author = 'Anonymous'
        let data = new FormData();
        data.append('title', title);
        data.append('tripCost', tripCost);
        data.append('location', location);
        data.append('reviewText', reviewText);
        data.append('uploadFile', uploadFile);
        data.append('recom', recom);
        console.log(uploadFile);
        if(currUser){
            author = currUser.first_name + " " + currUser.last_name[0].toUpperCase() + "."
        }
        data.append('author', author);
        Axios.post("http://localhost:5000/submitPost", data, {headers:{'Content-Type': 'multipart/form-data'}}).then((resp) => {
            if(resp.status === 200){
                alert("Successfully posted trip!");
                navigate('../Home');
            }
            else{
                console.log("bad");
            }
        });
    };
    
    
    const changeDial = (childData) => {
        setRecom(childData);
    }

    return (
        <Container fluid style={containerStyle}>
            <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                    <Form style={formStyle} id="postForm" onSubmit = {submitPost}>
                        <Row style={headerStyle}>
                            <Col><h2>New Post</h2></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Blog Title" name="title" 
                                onChange={(event) => {setBlogTitle(event.target.value);}} required/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type="text" value={location} placeholder="Location"
                                    onChange={(event)=>{ setLocation(event.target.value);}} required/>
                                </Form.Group>
                            </Col>
                            <Col xs={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Trip Price</Form.Label>
                                    <Form.Control type="number" step="0.01" value={tripCost} placeholder="Total Trip Cost $$"
                                    onChange={(event)=>{ setTripCost(event.target.value);}} required/>
                                </Form.Group>
                            </Col>
                            <Col xs={2}>
                                <Form.Label>Recommend?</Form.Label>
                                <br></br>
                                <Recommend_dial changeDial={changeDial}></Recommend_dial>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Review</Form.Label>
                                <Form.Control as="textarea" value={reviewText} rows={3} 
                                onChange={(event)=>{ setReviewText(event.target.value);}}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Share a photo that recaps your experience!</Form.Label>
                                <Form.Control type="file" size="sm" accept=".png, .jpg, .jpeg" name="uploadPhoto"
                                onChange={readFile}/>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Submit_post