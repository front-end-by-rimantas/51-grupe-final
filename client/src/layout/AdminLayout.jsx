import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { NotFound } from "../pages/NotFound";

export function AdminLayout() {
    const { isLoggedIn, role } = useContext(UserContext);

    return (
        <>
            <Header />
            {(isLoggedIn && role === 'admin') ? <Outlet /> : <NotFound />}
            <Footer />
        </>
    )
}