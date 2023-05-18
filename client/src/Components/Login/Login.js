import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { path } from "../../Utility/hostConfig";
import { Input } from "../UIElements/Input";
import { curUsr } from "../../Utility/User"
import "./Login.css";
import logo from "../../Images/StudyEngineLogo.png"


const Login = () => {

    const [username, setUsername] = useState("");
    const [pswrd, setPswrd] = useState("");

    let navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const body = {username, pswrd};
            const response = await axios.post(path.server + "/login", body);

            //console.log(response.data);

            if(!Object.keys(response.data).length){
                console.log("failed");
                alert("Incorrect user credentials. Try again")
            }else{
                console.log("success");
                curUsr.id = response.data.userid;
                curUsr.username = response.data.username;
                navigate("/courses");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleSignUp = () => {
        navigate("/createAcc");
    }

    return (
        <Fragment>
            <div className="login-container">
                <img className="" src={logo} alt="logo" />

                <div className='title-container'>
                    <h1 className="text-center">Welcome</h1>
                    <h1 className="text-center">Sign In</h1>
                </div>


                <div className="text-area">
                    <Input 
                        name={'Username'}
                        type={'text'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>
                <div className="text-area">
                    <Input 
                        name={'Password'}
                        type={'password'}
                        value={pswrd}
                        onChange={(e) => setPswrd(e.target.value)}
                    />

                </div>
                <div className="btn-area">
                    <button className="button btn mr-2" onClick={handleLogin}>Submit</button>
                    <button className="button btn ml-2" onClick={handleSignUp}>Sign Up</button>
                </div>
                    

            </div>

        </Fragment> 
    );
};

export default Login;