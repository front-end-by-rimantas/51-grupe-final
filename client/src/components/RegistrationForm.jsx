import { useState } from "react";
import { Link } from "react-router-dom";

export function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('alert-info');

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

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

        if (!checked) {
            console.error('Butina sutikti su salygomis!!!');
            return;
        }

        fetch('http://localhost:5114/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setAlertMessage(() => 'Registracija sėkminga. Prisijunkite.');
                    setAlertColor(() => 'alert-success');
                } else if (data.status === 'error') {
                    setAlertMessage(() => data.msg);
                    setAlertColor(() => 'alert-danger');
                } else {
                    setAlertMessage(() => 'Nežinoma klaida.');
                    setAlertColor(() => 'alert-warning');
                }
            })
            .catch(() => {
                setAlertMessage(() => 'Registracija nepavyko. Pabandykite vėliau.');
                setAlertColor(() => 'alert-danger');
            });

    }

    return (
        <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            {alertMessage && <div className={`alert ${alertColor}`} role="alert">
                {alertMessage}
            </div>}
            <div className="form-floating mb-3">
                <input onChange={handleUsernameChange} value={username} type="text" className="form-control" id="username" placeholder="Chuck Norris" required />
                <label htmlFor="username">Slapyvardis</label>
            </div>
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