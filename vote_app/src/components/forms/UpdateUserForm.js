import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import showToast from '../ToastHelper';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

const UpdateUserForm = ({ userId }) => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const initialFormData = {
        firstName: '',
        surname: '',
        dateOfBirth: '',
        longitude: '',
        latitude: '',
        email: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7088/api/UsersAdmin/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch user with ID ${userId}`);
                }

                const userData = await response.json();
                setFormData(userData);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };

        fetchUserDetails();
    }, [userId, token]);


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

        fetch(`https://localhost:7088/api/UsersAdmin/${userId}`, {
            method: 'PUT',
            body: form,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const message = data.message;

                showToast(message);
                navigate('/admin')

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
            <Form.Group className="mb-3" controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="text" name='longitude' placeholder="Longitude" value={formData.longitude} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="latitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="text" name='latitude' placeholder="Latitude" value={formData.latitude} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>

    );
};

export default UpdateUserForm;
