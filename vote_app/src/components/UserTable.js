import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import { useAuth } from '../contexts/AuthContext';


const UserTable = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);

    // fetchUsers using useCallback
    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch('https://localhost:7088/api/UsersAdmin', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }, [token]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); 


    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Date of Birth</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.surname}</td>
                        <td>{user.dateOfBirth}</td>
                        <td>{user.longitude}</td>
                        <td>{user.latitude}</td>
                        <td><Button as={Link} to={`/user-details/${user.userId}`} variant="primary">
                            Edit
                        </Button></td>
                        <td><DeleteUser userId={user.userId} onDelete={() => fetchUsers()}/></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default UserTable;
