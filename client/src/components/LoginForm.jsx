import { useState } from "react";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('alert-info');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:5114/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setAlertMessage(() => 'Prisijungimas sėkmingas.');
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
                setAlertMessage(() => 'Prisijungimas nepavyko. Pabandykite vėliau.');
                setAlertColor(() => 'alert-danger');
            });

    }
    return (
        <form onSubmit={handleSubmit} className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
            {alertMessage && <div className={`alert ${alertColor}`} role="alert">
                {alertMessage}
            </div>}
            <div className="form-floating mb-3">
                <input onChange={handleEmailChange} value={email} type="email" className="form-control" id="email" placeholder="name@example.com" required />
                <label htmlFor="email">El. paštas</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePasswordChange} value={password} type="password" className="form-control" id="password" placeholder="Password" required />
                <label htmlFor="password">Slaptažodis</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
        </form>
    );
}