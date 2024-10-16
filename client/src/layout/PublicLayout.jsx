import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}