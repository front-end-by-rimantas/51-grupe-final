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
            .then(data => {
                console.log(data);
                setIsLoggedIn(() => false);
                setRole(() => 'public');
            })
            .catch(console.error);
    }, []);


    function login() {
        setIsLoggedIn(() => true);
    }

    function logout() {
        setIsLoggedIn(() => false);
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