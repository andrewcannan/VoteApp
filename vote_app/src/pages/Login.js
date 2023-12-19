import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className='Content'>
            <h1 className='Page-Heading'>Login Page</h1>

            <div className="Content">
                <div className='Form-Wrapper'>
                    <LoginForm />
                    <p className="mt-3">
                        Not yet registered? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;