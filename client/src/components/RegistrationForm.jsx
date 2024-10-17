import { useState } from "react";
import { Link } from "react-router-dom";

export function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleTosChange(event) {
        setChecked(event.target.checked);
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log('siunciam duomenis i serveri...');
        console.log(email);
        console.log(password);
        console.log(checked);

        fetch('http://localhost:5114/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, checked }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

    }

    return (
        <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            <div className="form-floating mb-3">
                <input onChange={handleEmailChange} value={email} type="email" className="form-control" id="email" placeholder="name@example.com" required />
                <label htmlFor="email">El. paštas</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePasswordChange} value={password} type="password" className="form-control" id="password" placeholder="Password" required />
                <label htmlFor="password">Slaptažodis</label>
            </div>
            <div className="checkbox mb-3">
                <label>
                    <input onChange={handleTosChange} type="checkbox" value="tos" checked={checked ? "checked" : ""} required="required" /> Sutinku su
                </label> <Link to='/tos' target='_blank'>paslaugos teikimo sąlygomis</Link>.
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Registruotis</button>
        </form>
    );
}