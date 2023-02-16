import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import {Buffer} from 'buffer';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const [filterOption, setFilterOption] = useState("RecentPosts");
    const [searchTerm, setSearchTerm] = useState("")


    useEffect(() => {
        Axios.get("http://localhost:5000/Posts", {params:{filter:filterOption}}).then((response) => {
            for(let data of response.data){
                if(typeof data.photo !== "undefined" && data.photo !== null){
                    let buff = Buffer.from(data.photo).toString("base64");
                    data.photo = "data:${data.filetype};base64, " + buff;
                    response.photo = data.photo;
                }
            }
            setListOfPosts(response.data);
        });
    }, [filterOption]);

    const leftTextStyle = {
        textAlign: 'left',
    }

    const filterValues = val => {
        if(searchTerm == ""){
            return val
        } else if (val.author.includes(searchTerm)){
            return val
        } else if (val.title.includes(searchTerm)){
            return val
        } else if (moment(val.date.slice(0,10)).format('LL').includes(searchTerm)){
            return val
        }
    }

    return (
        <section className=" pt-4 container">
            <div class="alert alert-info w-75 mx-auto shadow-sm" role="alert">
            <b>Welcome to Travel Log!</b> 
            <p>A fast and easy way to share your travel experiences and learn from other travelers as well. <br></br> Register, make a post and explore all the travel logs.</p>
            </div>
            <div className="pb-4 pt-4 mx-auto w-75">
                <form className="row pb-4 pt-4 alert alert-secondary shadow-sm">
                    <div className="col-10">
                        <input type="search" className="form-control" id="searchHome" placeholder="Search by Author, Title, Date, Location" 
                        onChange={(event) => {setSearchTerm(event.target.value)}}/>
                    </div>
                    <div className="col-auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">Filter</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={()=>{setFilterOption("RecentPosts")}}>Recent Posts</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={()=>{setFilterOption("OldestPosts")}}>Oldest Posts</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>                
                </form>
            </div>
            {listOfPosts.filter(filterValues).map((post) => {
                return (
                    <div className="card mb-5 mx-auto w-75 shadow-sm" style={leftTextStyle}>
                        <div className="card-body"> 
                            <div className="row">
                                <div className="col"></div>
                                <div className="col-11">
                                <div className="pb-2">
                                    <h6 className=" d-inline text-primary">{post.author}</h6>
                                    <small className="p-3 text-black text-opacity-50 fst-italic">{moment(post.date.slice(0,10)).format('LL')}</small>
                                </div>
                                <div className="bottom-line"></div>
                                <h1 className="card-tile text-muted display-5 fw-normal">{post.title}</h1>
                                    <div className="row">
                                    <p className="col-auto text-muted"><i>{post.location}</i></p>
                                    <p className="col-auto text-muted">Price: ${post.tripCost}</p>
                                    <p className="col-auto text-muted">Recommend: <small className="fw-bold">{post.recom ? "Yes" : "No"}</small></p>
                                    </div>
                                    <p className="text-muted lead alert reviewBoxColor"> "{post.reviewText}"</p>
                                    <div className="pb-4 ">
                                    { post.photo && <img src={post.photo}></img> }
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    )
}

export default Home