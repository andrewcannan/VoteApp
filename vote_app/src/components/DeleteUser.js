import React from 'react';
import { Button } from 'react-bootstrap';
import showToast from './ToastHelper';
import { useAuth } from '../contexts/AuthContext';

const DeleteUser = ({ userId, onDelete }) => {
    const { token } = useAuth();

    const handleDelete = () => {
        fetch(`https://localhost:7088/api/UsersAdmin/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete user with ID ${userId}`);
                }

                showToast(`User deleted successfully`);
                onDelete(); // Call the onDelete callback of fetchUsers
            })
            .catch(error => {
                showToast(`Error deleting user: ${error.message}`);
                console.error('Error deleting user:', error);
            });
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            Delete
        </Button>
    );
};

export default DeleteUser;
