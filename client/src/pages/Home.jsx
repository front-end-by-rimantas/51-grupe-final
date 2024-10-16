import { RegistrationForm } from '../components/RegistrationForm';

export function Home() {
    return (
        <main>
            <div className="container px-4">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-6 col-xl-7 text-center text-lg-start">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Vertically centered hero sign-up form</h1>
                        <p className="fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </main>
    );
}