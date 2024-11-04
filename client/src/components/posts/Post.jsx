/* eslint-disable react/prop-types */
import { useContext } from 'react';
import style from './Post.module.css';
import { UserContext } from '../../context/UserContext';
import { formatTime } from '../../lib/formatTime';

export function Post({ post }) {
    const { userId } = useContext(UserContext);

    return (
        <div className="card shadow-sm my-5">
            <div className="card-body">
                <p className="card-text">{post.text}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        {post.user_id === userId && <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>}
                    </div>
                    <small className="text-body-secondary">{formatTime(post.created_at)}</small>
                </div>
            </div>
        </div>
    );
}