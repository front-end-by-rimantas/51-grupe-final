/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    role: 'public',
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [role, setRole] = useState(initialContext.role);
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);

    useEffect(() => {
        fetch('http://localhost:5114/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => data.status === 'error' ? logout() : login(data.role))
            .catch(console.error);
    }, []);


    function login(role) {
        setIsLoggedIn(() => true);
        setRole(() => role);
    }

    function logout() {
        setIsLoggedIn(() => initialContext.isLoggedIn);
        setRole(() => initialContext.role);
    }

    const value = {
        role,
        isLoggedIn,
        login,
        logout,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}