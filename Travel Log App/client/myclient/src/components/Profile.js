import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";


function Profile({currUser, changeLogStatus}) {
    const [first_name, setfirstName] = useState("");
    const [last_name, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [formDisabled, setformDisabled] = useState(true)
    const [deleteDisabled, setDeleteDisabled] = useState(true)

    const deleteUser = () => {
        let userId = currUser._id;
        Axios.delete("http://localhost:5000/deleteUser", {params:{id: userId}}).then((response) => {
            if (response.status === 204) {
                alert("Your account has been Deleted");
                changeLogStatus(null);
                window.location.href = "./";
            }
            else {
                console.log("delete user did not work")
            }
        });
    }

    const updateUser = () => {
        setformDisabled(true);
        let userId = currUser._id;
        Axios.patch("http://localhost:5000/updateUser", {
            userId,
            first_name,
            last_name,
            email,
        }).then((response) => {
            if (response.status === 200) {
                alert("Successfully updated your account!");
            }
            else {
                console.log("update did not work")
            }
        });
    };

    const leftTextStyle = {
        textAlign: 'left',
    }

    return (
        <>
        {
            currUser ?
            <section className="space container">
                <div className="card mb-4" style={leftTextStyle}>
                    <div className="card-body">
                        <h1 className="card-tile">{currUser.first_name + " " + currUser.last_name}</h1>
                        <h4 className="bottom-line pt-3 text-muted"> Profile Info</h4>
                        <fieldset disabled={formDisabled}>
                            <form >
                                <div className="form-group pt-2">
                                    <label>Username</label>
                                    <input type="text" className="form-control" id="username" placeholder={currUser.username} 
                                    onChange={(event)=>{setUsername(event.target.value)}} disabled/>
                                </div>
                                <div className="form-group pt-2">
                                    <label>First Name</label>
                                    <input type="text" className="form-control " id="accountEmail" aria-describedby="emailHelp" placeholder={currUser.first_name} 
                                    onChange={(event)=>{setfirstName(event.target.value)}}/>
                                </div>
                                <div className="form-group pt-2">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control " id="accountEmail" aria-describedby="emailHelp" placeholder={currUser.last_name} 
                                    onChange={(event)=>{setlastName(event.target.value)}}/>
                                </div>
                                <div className="form-group pt-2">
                                    <label>Email</label>
                                    <input type="email" className="form-control " id="accountEmail" aria-describedby="emailHelp" placeholder={currUser.email} 
                                    onChange={(event)=>{setEmail(event.target.value)}}/>
                                </div>
                            </form>
                        </fieldset>
                        {
                            formDisabled ?
                                <button type="button" className="mt-4 btn btn-primary" onClick={()=>{setformDisabled(false)}}>Edit Profile</button>
                                :
                                <button type="submit" className=" mt-4 btn btn-success" onClick={updateUser}>Save Changes</button>
                        }   
                    </div>
                </div>
                <div  className="card">
                    <div className="card-body mx-auto form-check">
                    <div className="form-check pb-2">
                        { deleteDisabled ? 
                        <input className="form-check-input" type="checkbox" onClick={()=>{setDeleteDisabled(false)}}></input>
                        :
                        <input className="form-check-input" type="checkbox" onClick={()=>{setDeleteDisabled(true)}}></input>
                        }
                        <label className="form-check-label" for="invalidCheck">
                            Your account will be permanently deleted
                        </label>
                    </div>
                        <button type="button" className="btn btn-danger" disabled={deleteDisabled} onClick={deleteUser}>Delete Account</button>
                    </div>
                </div>
            </section>
            :
            <></>
        }
        </>
    )
}

export default Profile