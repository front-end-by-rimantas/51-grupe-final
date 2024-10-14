import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function NotFound() {
    return (
        <>
            <Header />
            <main>
                <section className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>404</h1>
                            <p>Norimas puslapis nerastas</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}