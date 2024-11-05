import { useState } from 'react';
import style from './FeedForm.module.css';

export function FeedForm() {
    const [text, setText] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault();

        const minSize = 1;
        const maxSize = 1337;

        if (text.length < minSize || text.length > maxSize) {
            return;
        }

        fetch('http://localhost:5114/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ text }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(console.error);
    }

    return (
        <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
            <form onSubmit={handleFormSubmit} className={style.form}>
                <label htmlFor="post_text">Tavo naujo įrašo tekstas</label>
                <textarea value={text} onChange={e => setText(e.target.value)} id="post_text" />
                <button type="submit" className='btn btn-primary'>Sukurti įrašą</button>
            </form>
        </div>
    );
}