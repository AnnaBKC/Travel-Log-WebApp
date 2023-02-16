import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import Submit_post from "./Submit_post";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import Login from "./Login";


const Navbar = ( {changeLogStatus, currUser} ) => {
    const [isLogged, setIsLogged] = useState(false);

    const logout = (e) => {
        changeLogStatus(null);
        alert("You have been logged out");
        window.location.href = "./";
    }

    useEffect(() => {
        setIsLogged(localStorage.isLogged === 'true');
    });

    const TextStyle = {
        color:'#5754a8'
    }

    return (
        <>
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark navcolor pt-3 pb-3">
                <div className="container">
                    <a className="navbar-brand" href="/Home">
                        <img src={process.env.PUBLIC_URL + 'Travel-Log-Logo.png'} width="" height="30" alt=""/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/Home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/submit_post">New Post</a>
                            </li>
                            { 
                                isLogged ? 
                                (<>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Profile">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">{localStorage.user}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/" onClick={logout}>Logout</a>
                                    </li>
                                </>)
                                :
                                (<>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Register">Register</a>
                                    </li>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        </>
    );
}

export default Navbar;
