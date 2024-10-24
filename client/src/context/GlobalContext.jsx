/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialContext = {
    role: 'public',
    isLoggedIn: false,
    email: '',
    registeredAt: '',
    login: () => { },
    logout: () => { },
};

export const GlobalContext = createContext(initialContext);

export function ContextWrapper(props) {
    const [role, setRole] = useState(initialContext.role);
    const [isLoggedIn, setIsLoggedIn] = useState(initialContext.isLoggedIn);
    const [email, setEmail] = useState(initialContext.email);
    const [registeredAt, setRegisteredAt] = useState(initialContext.registeredAt);

    useEffect(() => {
        fetch('http://localhost:5114/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => data.status === 'error'
                ? logout()
                : login(data.role, data.email, data.registeredAt))
            .catch(console.error);
    }, []);


    function login(role, email, registeredAt) {
        setIsLoggedIn(() => true);
        setRole(() => role);
        setEmail(() => email);
        setRegisteredAt(() => registeredAt);
    }

    function logout() {
        setIsLoggedIn(() => initialContext.isLoggedIn);
        setRole(() => initialContext.role);
        setEmail(() => initialContext.email);
        setRegisteredAt(() => initialContext.registeredAt);
    }

    const value = {
        role,
        isLoggedIn,
        email,
        registeredAt,
        login,
        logout,
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}