import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';


const Home = () => {
    const {token, isAdmin} = useAuth();

    return (
        <div className="Content">
            {!token && (
                <>
                    <h1>Welcome to the Voting App</h1>
                    <p>Please login to register your vote.</p>
                    <Button as={Link} to="/login" variant="primary">
                        Go to Login Page
                    </Button>
                </>
            )}
            {isAdmin && (
                <>
                    <h1>Welcome to the Voting App</h1>
                    <p>Head to admin page to see Users and Votes</p>
                    <Button as={Link} to="/admin" variant="primary">
                        Go to Admin Page
                    </Button>
                </>
            )}
            {token && !isAdmin && (
                <>
                    <h1>Welcome to the Voting App</h1>
                    <p>Express your opinion by voting in our polls.</p>
                    <Button as={Link} to="/vote" variant="primary">
                        Go to Vote Page
                    </Button>
                </>
            )}   
        </div>
    );
}

export default Home;