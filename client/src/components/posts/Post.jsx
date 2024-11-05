/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import style from './Post.module.css';
import { UserContext } from '../../context/UserContext';
import { formatTime } from '../../lib/formatTime';

export function Post({ post }) {
    const textDisplayMaxSize = 200;

    const { userId } = useContext(UserContext);
    const [postTextFullSize, setPostTextFullSize] = useState(post.text.length < textDisplayMaxSize);

    const text = post.text.slice(0, textDisplayMaxSize).trim()
        + (post.text.length >= textDisplayMaxSize ? '... ' : '');

    return (
        <article className={style.post} data-id={post.post_id}>
            <header className={style.header}>
                <img className={style.authorImage} src="./img/users/person.jpg" alt="User photo" />
                <div className={style.texts}>
                    <div className="title">{post.email}</div>
                    <div className="time">{formatTime(post.created_at)}</div>
                </div>
                <i className={style.moreActions + ' fa fa-ellipsis-h'}></i>
            </header>
            <div className={style.content}>
                <p className={post.text.length < 100 ? style.bigText : ''}>
                    {postTextFullSize ? post.text : text}
                    <span onClick={() => setPostTextFullSize(pre => !pre)}
                        className={style.more}>Skaityti {postTextFullSize ? 'mažiau' : 'daugiau'}</span>
                </p>
            </div>
            <div className={style.interactions}>
                <div className={style.action}>
                    <i className="fa fa-thumbs-o-up"></i>
                    <span>Like</span>
                    {post.likes_count > 0 && <span>({post.likes_count})</span>}
                </div>
                <div className={style.action}>
                    <i className="fa fa-comment-o"></i>
                    <span>Comment</span>
                </div>
            </div>
            <div className={style.commentForm}>
                <img src="#" alt="My photo" />
                <div className={style.form}>
                    <textarea></textarea>
                    <div className={style.icons}>
                        <i className="fa fa-globe"></i>
                        <i className="fa fa-globe"></i>
                        <i className="fa fa-globe"></i>
                        <i className="fa fa-globe"></i>
                    </div>
                </div>
            </div>
        </article>
    )

    // return (
    //     <div className="card shadow-sm my-5">
    //         <div className="card-body">
    //             <p className="card-text">{post.text}</p>
    //             <div className="d-flex justify-content-between align-items-center">
    //                 <div className="btn-group">
    //                     <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
    //                     {post.user_id === userId && <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>}
    //                 </div>
    //                 <small className="text-body-secondary">{formatTime(post.created_at)}</small>
    //             </div>
    //         </div>
    //     </div>
    // );
}