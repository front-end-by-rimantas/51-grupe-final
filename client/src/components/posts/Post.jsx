/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import style from './Post.module.css';
import { UserContext } from '../../context/UserContext';
import { formatTime } from '../../lib/formatTime';
import thumbUpIcon from '../../assets/thumb-up.svg';
import thumbDownIcon from '../../assets/thumb-down.svg';
import commentIcon from '../../assets/comment.svg';
// import smileIcon from '../../assets/smile.svg';
// import cameraIcon from '../../assets/camera.svg';
// import gifIcon from '../../assets/gif.svg';
import userDefaultProfile from '../../assets/userDefaultProfile.svg';
import { API_RESPONSE_STATUS } from '../../../../server/lib/enum';
import { PostsContext } from '../../context/PostsContext';

export function Post({ post }) {
    const softCutLimit = 200;
    const hardCutLimit = softCutLimit + 50;

    const { userId, profileImage } = useContext(UserContext);
    const { updateLikeCount } = useContext(PostsContext);
    const [postTextFullSize, setPostTextFullSize] = useState(post.text.length < hardCutLimit);

    const text = postTextFullSize
        ? post.text
        : post.text.slice(0, softCutLimit).trim() + '... ';

    function handleLikeClick() {
        fetch('http://localhost:5114/api/post-like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                postId: post.post_id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === API_RESPONSE_STATUS.SUCCESS) {
                    updateLikeCount(post.post_id);
                }
            })
            .catch(console.error);
    }

    return (
        <article className={style.post} data-id={post.post_id}>
            <header className={style.header}>
                <img className={style.authorImage} src={post.profile_image || userDefaultProfile} alt="User photo" />
                <div className={style.texts}>
                    <div className="title">{post.username}</div>
                    <div className="time">{formatTime(post.created_at)}</div>
                </div>
                <i className={style.moreActions + ' fa fa-ellipsis-h'}></i>
            </header>
            <div className={style.content}>
                <p className={post.text.length < 100 ? style.bigText : ''}>
                    {text}
                    {text !== post.text
                        && <span onClick={() => setPostTextFullSize(pre => !pre)}
                            className={style.more}>Skaityti {postTextFullSize ? 'mažiau' : 'daugiau'}</span>
                    }
                </p>
            </div>
            <div className={style.interactions}>
                <div onClick={handleLikeClick} className={`${style.action} ${post.do_i_like === 1 ? 'btn btn-primary' : ''}`}>
                    <img src={thumbUpIcon} alt="Patinka" />
                    <span>Patinka</span>
                    {post.likes_count > 0 && <span>({post.likes_count})</span>}
                </div>
                {/* <div className={style.action}>
                    <img src={thumbDownIcon} alt="Nepatinka" />
                    <span>Nepatinka</span>
                    {post.dislikes_count > 0 && <span>({post.dislikes_count})</span>}
                </div> */}
                <div className={style.action}>
                    <img src={commentIcon} alt="Komentarai" />
                    <span>Komentarai</span>
                    {post.comments_count > 0 && <span>({post.comments_count})</span>}
                </div>
            </div>
            <div className={style.commentForm}>
                <img src={profileImage || userDefaultProfile} alt="My photo" />
                <div className={style.form}>
                    <textarea></textarea>
                    {/* <div className={style.icons}>
                        <img src={smileIcon} alt="Emoji" />
                        <img src={cameraIcon} alt="Įkelti nuotrauką" />
                        <img src={gifIcon} alt="Įkelti judantį paveiksliuką" />
                    </div> */}
                </div>
            </div>
        </article>
    )
}