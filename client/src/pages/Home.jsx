import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <section className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Sveiki atvyke i Gandalizdzio socialini tinkla!</h1>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}