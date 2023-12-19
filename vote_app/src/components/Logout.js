import showToast from "./ToastHelper";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from "react";



const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const logoutUser = () => {
            logout();
            navigate('/');
            showToast('You have successfully logged out.')
        }
        logoutUser();
    }, [logout, navigate]);
};

export default Logout;