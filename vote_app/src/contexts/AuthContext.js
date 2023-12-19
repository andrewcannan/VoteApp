import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        // Initialize token from localStorage if it exists
        const storedToken = localStorage.getItem('token');
        return storedToken || null;
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (newToken) => {
        setToken(newToken);

        if (newToken) {
            // Decode the new token to get user claims
            const decodedToken = jwtDecode(newToken);

            // Check if the user has the isAdmin claim
            const isAdminClaim = decodedToken?.admin === 'True';
            setIsAdmin(isAdminClaim);
        }
    };

    const logout = () => {
        setToken(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};