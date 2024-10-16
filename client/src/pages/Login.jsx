import { LoginForm } from "../components/LoginForm";

export function Login() {
    return (
        <main>
            <div className="container px-4">
                <div className="row">
                    <h1 className='text-center'>Prisijungti</h1>
                </div>
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    );
}