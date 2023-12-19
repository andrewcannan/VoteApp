import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import showToast from '../ToastHelper';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';



const VotingForm = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const initialFormData = {
        yesVote: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }

        fetch('https://localhost:7088/api/vote', {
            method: 'POST',
            body: form,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                const message = data.message;

                showToast(message);

                if (data.redirect === true) {
                    navigate('/');
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
            <p className='mb-3'>Should Andrew get the job?</p>

            <Form.Group className='mb-3' controlId="yesVote">
                <Form.Check name="yesVote" type="checkbox" label="Check to vote YES!" defaultChecked={formData.yesVote} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default VotingForm;
