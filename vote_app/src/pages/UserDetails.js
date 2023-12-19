import React, { useEffect } from 'react';
import UpdateUserForm from '../components/forms/UpdateUserForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import showToast from '../components/ToastHelper';

const UserDetails = () => {
    const { userId } = useParams();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is not authenticated and navigate to the home page
        if (!isAdmin) {
            showToast('You must be an admin to view this page');
            navigate('/');
        }
    }, [isAdmin, navigate]);

    return (
        <div className='Content'>
            <h1 className='Page-Heading'>User Details</h1>
            <div className="Content">
                <div className="Form-Wrapper">
                    <UpdateUserForm userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
