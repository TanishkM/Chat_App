import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import login_cont from "../context/login_cont"

const Login = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "" })
    const context = useContext(login_cont);
    const { spage, setpage } = context;
    let history = useHistory();
    localStorage.removeItem('token');

    const handlespage=()=>{
        setpage();

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        if(!spage)
        { response = await fetch("http://localhost:3001/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });}

        else
        {
            response = await fetch("http://localhost:3001/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name:credentials.name, email: credentials.email, password: credentials.password })
        });
        }
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('name', json.authtoken);
            history.push("/");

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container w-75 mt-5'>
            <h3 className='py-2'>{!spage ? "Login" : "SignUp"}</h3>
            <form onSubmit={handleSubmit}>
                {spage?(
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>):""}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className='d-flex'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-primary ml-auto" onClick={handlespage}>{spage ? "Login" : "SignUp"}</button>
                </div>
            </form>
        </div>
    )
}

export default Login