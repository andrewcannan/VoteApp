import React, { useEffect } from 'react';
import VotingForm from '../components/forms/VotingForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import showToast from '../components/ToastHelper';

const Vote = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not authenticated and navigate to the home page
    if (!token) {
      showToast('You must be logged in to Vote');
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className='Content'>
      <h1 className='Page-Heading'>Vote Page</h1>
      <div className="Content">
        <div className='Form-Wrapper'>
          <VotingForm />
        </div>
      </div>
    </div>
  );
};

export default Vote;
