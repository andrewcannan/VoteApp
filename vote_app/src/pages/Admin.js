import React, { useEffect } from 'react';
import VoteTable from "../components/VoteTable";
import UserTable from "../components/UserTable";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import showToast from '../components/ToastHelper';

const Admin = () => {
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
            <h1 className='Page-Heading'>Admin Page</h1>

            <div className="Content">
                <div className="Form-Wrapper">
                <UserTable />
                <hr></hr>
                <VoteTable />
                </div>
            </div>
        </div>
    );
}

export default Admin;