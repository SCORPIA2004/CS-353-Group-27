import {createContext, useEffect, useState} from "react";
import {CHECK_TOKEN_URL} from "../helpers/ApiUrlHelper";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Perform additional validation or verification of the token if needed
            // For example, you might want to send the token to your backend for verification
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (token, goHome) => {
        try {
            const response = await fetch(CHECK_TOKEN_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                // Token is valid
                const userInfo = await response.json();

                // Store the token in localStorage
                localStorage.setItem('token', token);

                setUser(userInfo);
                // Update the authentication state
                setIsAuthenticated(true);
                goHome();
            } else if (response.status === 401) {
                // Token is invalid or expired
                console.error('Unauthorized: Token is either missing, invalid, or expired.');
                setIsAuthenticated(false);
            } else {
                // Handle other potential errors
                console.error('An error occurred while checking the token.');
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const authContextValue = {
        isAuthenticated,
        isLoading,
        login,
        logout,
        user,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
