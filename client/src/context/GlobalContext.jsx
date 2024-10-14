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
        // TODO: auth API -> login
        setIsLoggedIn(() => false);
        setRole(() => 'public');
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