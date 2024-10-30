import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { LoginForm } from "../components/LoginForm";

export function UserLayout() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <>
            <Header />
            {isLoggedIn && <Outlet />}
            {!isLoggedIn && (
                <main>
                    <div className="container px-4">
                        <div className="row">
                            <h1 className='text-center'>Turinys skirtas tik prisijungusiems vartotojams</h1>
                        </div>
                        <div className="row align-items-center g-lg-5 py-5">
                            <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </main>
            )}
            <Footer />
        </>
    )
}