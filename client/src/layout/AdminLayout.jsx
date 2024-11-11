import { useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Outlet } from 'react-router-dom';
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
                                    <a className="link-secondary" href="#" aria-label="Add a new report">
                                        {/* <svg className="bi"><use xlinkHref="#plus-circle"></use></svg> */}
                                    </a>
                                </h6>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#house-fill"></use></svg> */}
                                            Dashboard
                                        </a>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Vartotojai</span>
                                    <a className="link-secondary" href="#" aria-label="Add a new report">
                                        {/* <svg className="bi"><use xlinkHref="#plus-circle"></use></svg> */}
                                    </a>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Visi vartotojai
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Administratoriai
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Paprasti vartotojai
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Blokuotos paskyros
                                        </a>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Žinutės</span>
                                    <a className="link-secondary" href="#" aria-label="Add a new report">
                                        {/* <svg className="bi"><use xlinkHref="#plus-circle"></use></svg> */}
                                    </a>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Visos žinutės
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Viešos žinutės
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#file-earmark-text"></use></svg> */}
                                            Blokuotos žinutės
                                        </a>
                                    </li>
                                </ul>

                                <hr className="my-3" />

                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                                            {/* <svg className="bi"><use xlinkHref="#gear-wide-connected"></use></svg> */}
                                            Nustatymai
                                        </a>
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