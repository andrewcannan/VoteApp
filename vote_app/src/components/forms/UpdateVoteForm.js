import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import showToast from '../ToastHelper';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';


const UpdateVoteForm = ({ voteId }) => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const initialFormData = {
        yesVote: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchVoteDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7088/api/VotesAdmin/${voteId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch vote with ID ${voteId}`);
                }

                const voteData = await response.json();
                if (voteData.yesVote === true) {
                    setFormData({ yesVote: true });
                }

            } catch (error) {
                console.error('Error fetching vote details:', error.message);
            }
        };

        fetchVoteDetails();
    }, [voteId, token]);

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

        fetch(`https://localhost:7088/api/VotesAdmin/${voteId}`, {
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
                navigate('/admin');
                
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
                <Form.Check name="yesVote" type="checkbox" label="Check to vote YES!" checked={formData.yesVote} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    );
};

export default UpdateVoteForm;
