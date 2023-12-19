import React from 'react';
import { Button } from 'react-bootstrap';
import showToast from './ToastHelper';
import { useAuth } from '../contexts/AuthContext';

const DeleteVote = ({ voteId, onDelete }) => {
    const { token } = useAuth();

    const handleDelete = () => {
        fetch(`https://localhost:7088/api/VotesAdmin/${voteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete vote with ID ${voteId}`);
                }

                showToast(`Vote deleted successfully`);
                onDelete(); // Call the onDelete callback of fetchVotes
            })
            .catch(error => {
                showToast(`Error deleting vote: ${error.message}`);
                console.error('Error deleting vote:', error);
            });
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            Delete
        </Button>
    );
};

export default DeleteVote;
