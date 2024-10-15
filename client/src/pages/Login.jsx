import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Login() {
    return (
        <>
            <Header />
            <main>
                <div className="container px-4">
                    <div className="row">
                        <h1 className='text-center'>Prisijungti</h1>
                    </div>
                    <div className="row align-items-center g-lg-5 py-5">
                        <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                                    <label htmlFor="email">El. paštas</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="password" placeholder="Password" required />
                                    <label htmlFor="password">Slaptažodis</label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}