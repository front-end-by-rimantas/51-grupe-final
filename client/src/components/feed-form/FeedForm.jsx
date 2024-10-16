import style from './FeedForm.module.css';

export function FeedForm() {
    return (
        <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
            <form action="" className={style.form}>
                <label htmlFor="post_text">Tavo naujo įrašo tekstas</label>
                <textarea id="post_text"></textarea>
                <button type="submit" className='btn btn-primary'>Sukurti įrašą</button>
            </form>
        </div>
    );
}