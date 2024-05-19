import { createContext, useEffect, useState } from "react";
import { CHECK_TOKEN_URL } from "../helpers/ApiUrlHelper";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token) {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
                setIsLoading(false);
            } else {
                login(token, ()=>{});
            }
        } else {
            setIsLoading(false);
        }
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

                // Store the token and user info in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userInfo));

                setUser(userInfo);
                // Update the authentication state
                setIsAuthenticated(true);
                goHome();
            } else {
                // Token is invalid or expired
                logout();
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
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
