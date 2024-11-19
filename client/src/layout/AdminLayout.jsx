import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import { NotFound } from "../pages/public/NotFound";

export function AdminLayout() {
    const { isLoggedIn, role } = useContext(UserContext);

    if (!isLoggedIn || role !== 'admin') {
        return (
            <>
                <Header />
                <NotFound />
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header fullWidth={true} />
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>General</span>
                                </h6>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-link d-flex align-items-center gap-2 active" aria-current="page">Suvestinė</Link>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Vartotojai</span>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link to="/admin/accounts" className="nav-link d-flex align-items-center gap-2">Visi vartotojai</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/accounts/admin" className="nav-link d-flex align-items-center gap-2">Administratoriai</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/accounts/users" className="nav-link d-flex align-items-center gap-2">Paprasti vartotojai</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/accounts/blocked" className="nav-link d-flex align-items-center gap-2">Blokuotos paskyros</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/accounts/deleted" className="nav-link d-flex align-items-center gap-2">Ištrintos paskyros</Link>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Žinutės</span>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link to="/admin/posts" className="nav-link d-flex align-items-center gap-2">Visos žinutės</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/posts/active" className="nav-link d-flex align-items-center gap-2">Viešos žinutės</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/posts/blocked" className="nav-link d-flex align-items-center gap-2">Blokuotos žinutės</Link>
                                    </li>
                                </ul>

                                <hr className="my-3" />

                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link to="/admin/settings" className="nav-link d-flex align-items-center gap-2">Nustatymai</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}