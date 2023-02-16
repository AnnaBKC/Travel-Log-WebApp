import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";
import Navbar from './components/Navbar';
import Register from "./components/Register";
import Home from "./components/Home";
import Submit_post from "./components/Submit_post";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  const link_git = '<insert_github_link>'
  const [isLogged, setLoggedStatus] = useState(false);
  const [currUser, setCurrUser] = useState(null);

  const changeLogStatus = (user) => {
      if(user){
        setLoggedStatus(true);  
        setCurrUser(user);
        localStorage.setItem('user', user);
        localStorage.setItem('isLogged', true);
      }
      else{
        setLoggedStatus(false);
        setCurrUser(null);
        localStorage.setItem('user', null);
        localStorage.setItem('isLogged', false);
      }
  }

  useEffect(() => {
      if(localStorage.user !== 'null'){
          Axios.get("http://localhost:5000/getUser", {params:{user:localStorage.user}}).then((response) => {
          setCurrUser(response.data);
        });
      }
      else{
        setCurrUser(null);
      }
  }, [localStorage.user])

  return (
    <div className="App" style={{backgroundColor: "basecolor"}}>
        <Navbar changeLogStatus={changeLogStatus}></Navbar>
        <Router>
            <Routes>
                <Route path="/" element={<Home />}> </Route>
                <Route path="/Register" element={<Register />}> </Route>
                <Route path="/Home" element={<Home />}> </Route>
                <Route path="/Submit_post" element={<Submit_post currUser={currUser}/>}> </Route>
                <Route path="/Profile" element={<Profile currUser={currUser} changeLogStatus={changeLogStatus}/>}> </Route>
                <Route path="/Login" element={<Login changeLogStatus={changeLogStatus}/>}> </Route>
            </Routes>
        </Router>

    </div>
  )
}

export default App;