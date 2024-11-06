/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const initialUserContext = {
    role: 'public',
    userId: 0,
    username: '',
    isLoggedIn: null,
    email: '',
    profileImage: '',
    registeredAt: '',
    login: () => { },
    logout: () => { },
};

export const UserContext = createContext(initialUserContext);

export function UserContextWrapper(props) {
    const [role, setRole] = useState(initialUserContext.role);
    const [userId, setUserId] = useState(initialUserContext.userId);
    const [username, setUsername] = useState(initialUserContext.username);
    const [isLoggedIn, setIsLoggedIn] = useState(initialUserContext.isLoggedIn);
    const [email, setEmail] = useState(initialUserContext.email);
    const [profileImage, setProfileImage] = useState(initialUserContext.profileImage);
    const [registeredAt, setRegisteredAt] = useState(initialUserContext.registeredAt);

    useEffect(() => {
        fetch('http://localhost:5114/api/login', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => data.status === 'error'
                ? logout()
                : login(data))
            .catch(console.error);
    }, []);


    function login(userObj) {
        setIsLoggedIn(() => true);
        setUserId(() => userObj.id);
        setUsername(() => userObj.username);
        setRole(() => userObj.role);
        setEmail(() => userObj.email);
        setProfileImage(() => userObj.profileImage);
        setRegisteredAt(() => userObj.registeredAt);
    }

    function logout() {
        setIsLoggedIn(() => false);
        setUserId(() => initialUserContext.userId);
        setUsername(() => initialUserContext.username);
        setRole(() => initialUserContext.role);
        setEmail(() => initialUserContext.email);
        setProfileImage(() => initialUserContext.profileImage);
        setRegisteredAt(() => initialUserContext.registeredAt);
    }

    const value = {
        role,
        userId,
        username,
        isLoggedIn,
        email,
        profileImage,
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