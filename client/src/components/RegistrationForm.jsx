import { Link } from "react-router-dom";

export function RegistrationForm() {
    return (
        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                <label htmlFor="email">El. paštas</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" required />
                <label htmlFor="password">Slaptažodis</label>
            </div>
            <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="tos" required /> Sutinku su
                </label> <Link to='/tos' target='_blank'>paslaugos teikimo sąlygomis</Link>.
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Registruotis</button>
        </form>
    );
}