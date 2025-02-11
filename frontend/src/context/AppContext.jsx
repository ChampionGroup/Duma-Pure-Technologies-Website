import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    const getAuthState = async () => {
        const constructedUrl = backendUrl + '/api/auth/is-auth';
        console.log(`Constructed URL for auth check: ${constructedUrl}`);
        try {
            const data = await fetch(constructedUrl);
            console.log(data);
            if(data.data.success){
                setIsLoggedin(true);
                getUserData(data.data.userData);
            }
        } catch (err) {
            console.error('Auth check failed:', err);
        }
    }

    const getUserData = async () => {

        try {
            const response = await fetch(backendUrl + '/api/auth/data');
            console.log(response.data.userData);
            if (response.data.success) {
                setUserData(response.data.userData); // Ensure this matches your backend response structure
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {
        getAuthState();
    },[])

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}