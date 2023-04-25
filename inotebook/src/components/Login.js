import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [creds, setCreds] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3001/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: creds.email, password: creds.password }),
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.authToken);
            navigate('/');

        }
        //response should generate auth token 
        console.log("login", data);
        // Reset the state of `creds` to an empty object
        setCreds({ email: "", password: "" });

    }
    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
        // when the user types in the email input field, onChange is triggered with e.target.name set to "email" and e.target.value set to the value entered by the user. When we use [e.target.name] inside the square brackets, it sets the key of the creds state object to "email" and sets the value of that key to e.target.value.
    }
    return (
        <div className='container col-md-6 mt-5 mb-5 border border-primary rounded'>
            <div className='container mx-6' >
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control border border-primary" id="email" name='email' value={creds.email} aria-describedby="emailHelp" onChange={onChange} autoComplete='off' />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label ">Password</label>
                        <input type="text" className="form-control border border-primary rounded" id="password" name='password' value={creds.password} onChange={onChange} autoComplete='off' />
                    </div>

                    <div className="d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login