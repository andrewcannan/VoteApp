import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import showToast from '../ToastHelper';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const initialFormData = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleNavigation = (redirectPath) => {
        navigate(redirectPath);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }

        fetch('https://localhost:7088/api/login', {
            method: 'POST',
            body: form,
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    login(data.token);
                }

                if (data.redirect === true) {
                    handleNavigation('/');
                } else {
                    setFormData(initialFormData);
                }

                const message = data.message;

                showToast(message);

            })
            .catch(error => {
                showToast('Error posting data:', error);
                console.error('Error posting data:', error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className='mb-3' controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default LoginForm;