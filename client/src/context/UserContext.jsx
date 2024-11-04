/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialUserContext = {
    role: 'public',
    userId: 0,
    isLoggedIn: null,
    email: '',
    registeredAt: '',
    login: () => { },
    logout: () => { },
};

export const UserContext = createContext(initialUserContext);

export function UserContextWrapper(props) {
    const [role, setRole] = useState(initialUserContext.role);
    const [userId, setUserId] = useState(initialUserContext.userId);
    const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
    const [email, setEmail] = useState(initialUserContext.email);
    const [registeredAt, setRegisteredAt] = useState(initialUserContext.registeredAt);

    useEffect(() => {
        fetch('http://localhost:5114/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => data.status === 'error'
                ? logout()
                : login(data.role, data.id, data.email, data.registeredAt))
            .catch(console.error);
    }, []);


    function login(role, id, email, registeredAt) {
        setIsLoggedIn(() => true);
        setUserId(() => id);
        setRole(() => role);
        setEmail(() => email);
        setRegisteredAt(() => registeredAt);
    }

    function logout() {
        setIsLoggedIn(() => false);
        setUserId(() => initialUserContext.userId);
        setRole(() => initialUserContext.role);
        setEmail(() => initialUserContext.email);
        setRegisteredAt(() => initialUserContext.registeredAt);
    }

    const value = {
        role,
        userId,
        isLoggedIn,
        email,
        registeredAt,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}