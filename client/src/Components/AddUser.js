import React, { Fragment, useState } from "react";


const AddUser = () => {

    const [username, setUsername] = useState("");
    const [pswrd, setPswrd] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {username, pswrd};
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5" onSubmit={onSubmitForm}>Add User</h1>
            <form className="d-flex mt-3">
                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="text" className="form-control" value={pswrd} onChange={e => setPswrd(e.target.value)}></input>
                <button className="btn btn-success ml-2">Add</button>
            </form>
        </Fragment> 
    );
}


export default AddUser;