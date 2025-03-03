import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(null);

    const getAuthState = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${backendUrl}/api/auth/is-auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setIsLoggedin(true);
                getUserData();
            }
        } catch (err) {
            console.error('Auth check failed:', err);
            setIsLoggedin(false);
            setUserData(null);
        }
    };

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/auth/data`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.data;
            if (data.success) {
                setUserData(data.userData);
                setIsLoggedin(true);
            } else {
                setIsLoggedin(false);
                setUserData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error('Server Response:', error.response.data);
            }
            setIsLoggedin(false);
            setUserData(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getAuthState();
            getUserData();
        }
    }, []);

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};