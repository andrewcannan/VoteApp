import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import showToast from '../ToastHelper';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const navigate = useNavigate();
    const initialFormData = {
        firstName: '',
        surname: '',
        dateOfBirth: '',
        postcode: '',
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one digit');
        }
        setPasswordErrors(errors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        validatePassword(formData.password);

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }

        fetch('https://localhost:7088/api/register', {
            method: 'POST',
            body: form,
        })
            .then(response => response.json())
            .then(data => {
                const message = data.message;

                showToast(message);

                if (data.redirect === true) {
                    navigate('/login');
                } else {
                    setFormData(initialFormData);
                }
            })
            .catch(error => {
                showToast('Error posting data:', error);
                console.error('Error posting data:', error);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='firstName' placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surname">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="text" name='surname' placeholder="Surname" value={formData.surname} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name='dateOfBirth' placeholder="DD/MM/YYYY" value={formData.dateOfBirth} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postcode">
                <Form.Label>Postcode</Form.Label>
                <Form.Control type="text" name='postcode' placeholder="Postcode" pattern=
                    '([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})'
                    title='Please Enter Valid UK Postcode' value={formData.postcode} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                {passwordErrors.length > 0 && (
                    <Alert variant="danger">
                        {passwordErrors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </Alert>
                )}
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    );
};

export default RegisterForm;
