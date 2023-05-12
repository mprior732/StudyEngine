import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { path } from "../../Utility/hostConfig";
import { Input } from "../UIElements/Input";
import "./CreateAccount.css";
import logo from "../../Images/StudyEngineLogo.png"


const CreateAcc = () => {

    const [username, setUsername] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [rePswrd, setRePswrd] = useState("");

    let navigate = useNavigate();

    const handleCreateAcc = async e => {
        e.preventDefault();
        try {
            const body1 = {username};
            const body2 = {username, pswrd}

            const response1 = await axios.post(path.server + "/checkUsrnme", body1);

            console.log(response1.data);

            if(!Object.keys(response1.data).length){
                console.log("Username is available");
                if(pswrd === rePswrd){
                    const response2 = await axios.post(path.server + "/createAccount", body2);

                    if(!Object.keys(response2.data).length){
                        console.log("An Error has Occured");
                        alert("An Error has occured. Please try again later");
                    }else{
                        console.log("success");
                        alert("Account created!\nWelcome, " + username);
                        navigate("/");
                    }
                }else{
                    alert("Passwords don't match");
                }
            }else{
                console.log("Username taken");
                alert("Username is already in use");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleBack = () => {
        navigate("/");
    }

    return (
        <Fragment>
            <div className="login-container">
                <img className="" src={logo} alt="logo" />

                <div className='title-container'>
                    <h1 className="text-center">Sign Up</h1>
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
                <div className="text-area">
                    <Input 
                        name={'Re-type Password'}
                        type={'password'}
                        value={rePswrd}
                        onChange={(e) => setRePswrd(e.target.value)}
                    />

                </div>
                <div className="btn-area">
                <button className="button btn mr-2" onClick={handleBack}>Back</button>
                    <button className="button btn ml-2" onClick={handleCreateAcc}>Sign Up</button>                   
                </div>
                    

            </div>

        </Fragment> 
    );
};

export default CreateAcc;