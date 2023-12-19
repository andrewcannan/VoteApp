import React from 'react';
import RegisterForm from '../components/forms/RegisterForm';
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className='Content'>
            <h1 className='Page-Heading'>Register Page</h1>

            <div className="Content">
                <div className='Register-Form-Wrapper'>
                    <RegisterForm />
                    <p className="mt-3">
                        Already registered? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;