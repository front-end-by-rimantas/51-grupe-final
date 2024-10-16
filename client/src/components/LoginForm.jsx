export function LoginForm() {
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
            <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
        </form>
    );
}