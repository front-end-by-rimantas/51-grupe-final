import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function UserProfile() {
    const { role, email, registeredAt } = useContext(UserContext);

    return (
        <main>
            <div className="container px-4">
                <div className="row align-items-center mb-5">
                    <h1>Vartotojo profilis</h1>
                </div>
                <div className="row g-lg-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">Rolė</p>
                        <p>{role}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">El. paštas</p>
                        <p>{email}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">Registracijos data</p>
                        <p>{registeredAt}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}