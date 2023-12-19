import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import DeleteVote from './DeleteVote';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VoteTable = () => {
    const { token } = useAuth();
    const [votes, setVotes] = useState([]);

    // fetchVotes using useCallback
    const fetchVotes = useCallback(async () => {
        try {
            const response = await fetch('https://localhost:7088/api/VotesAdmin', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch votes');
            }

            const data = await response.json();
            setVotes(data);
        } catch (error) {
            console.error('Error fetching votes:', error.message);
        }
    }, [token]);

    useEffect(() => {
        fetchVotes();
    }, [fetchVotes]); 

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Vote ID</th>
                    <th>User ID</th>
                    <th>Vote</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {votes.map((vote) => (
                    <tr key={vote.voteId}>
                        <td>{vote.voteId}</td>
                        <td>{vote.user}</td>
                        <td>
                            <>
                            {vote.yesVote === true ? (
                                <i className="fa-solid fa-check"></i>
                            ) : (
                                <i className="fa-solid fa-xmark"></i>
                            )}
                            </>
                        </td>
                        <td><Button as={Link} to={`/vote-details/${vote.voteId}`} variant="primary">
                            Edit
                        </Button></td>
                        <td><DeleteVote voteId={vote.voteId} onDelete={() => fetchVotes()} /></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default VoteTable;
