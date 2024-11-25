/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { REACTION_TYPE } from "../../../server/lib/enum";

export const initialPostsContext = {
    posts: [],
    loadInitialPosts: () => { },
    loadNewPosts: () => { },
    loadOlderPosts: () => { },
    addMyPost: () => { },
    removeMyPost: () => { },
    updateLikeCount: () => { },
    // addPostComment: () => { },
    // removePostComment: () => { },
    // loadInitialPostComments: () => { },
    // loadNewPostComments: () => { },
    // loadOlderPostComments: () => { },
    // postCommentReaction: () => { },
};

export const PostsContext = createContext(initialPostsContext);

export function PostsContextWrapper(props) {
    const feedRefreshIntervalInSeconds = 10;
    const { isLoggedIn, logout } = useContext(UserContext);
    const [posts, setPosts] = useState(initialPostsContext.posts);

    useEffect(() => {
        if (isLoggedIn === true) {
            loadInitialPosts();
        }

        if (isLoggedIn === false) {
            setPosts(() => []);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn !== true) {
            return;
        }

        const id = setTimeout(async () => {
            const newPosts = await loadNewPosts();
            setPosts(pre => [...newPosts, ...pre]);
        }, feedRefreshIntervalInSeconds * 1000);

        return () => clearInterval(id);
    }, [isLoggedIn, posts]);

    async function loadInitialPosts() {
        return fetch('http://localhost:5114/api/post/initial', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setPosts(() => [...data.posts]);
            })
            .catch(err => {
                console.error(err);
            });
    }

    async function loadNewPosts() {
        if (!isLoggedIn) {
            return;
        }

        const newestPostId = posts.at(0)?.post_id ?? 0;
        return fetch('http://localhost:5114/api/post/new/' + newestPostId, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'error' && data.isLoggedIn === false) {
                    logout();
                    return [];
                }
                return data.posts;
            })
            .catch(err => {
                console.error(err);
                return [];
            });
    }

    async function loadOlderPosts() {
        const lastPostId = posts.at(-1)?.post_id ?? 0;
        return fetch('http://localhost:5114/api/post/old/' + lastPostId, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setPosts(pre => [...pre, ...data.posts]);
            })
            .catch(err => {
                console.error(err);
                return [];
            });
    }

    function addMyPost() {
    }

    function removeMyPost() {
    }

    function updateLikeCount(postId, reactionId) {
        setPosts(pre => pre.map(post => {
            if (post.post_id === postId) {
                return {
                    ...post,
                    my_reaction_id:
                        post.my_reaction_id === reactionId ? REACTION_TYPE.NONE : reactionId,
                    likes_count:
                        post.likes_count
                        + (post.my_reaction_id === REACTION_TYPE.LIKE ? -1 : 0)
                        + (reactionId === REACTION_TYPE.LIKE && post.my_reaction_id !== reactionId ? 1 : 0),
                    dislike_count:
                        post.dislike_count
                        + (post.my_reaction_id === REACTION_TYPE.DISLIKE ? -1 : 0)
                        + (reactionId === REACTION_TYPE.DISLIKE && post.my_reaction_id !== reactionId ? 1 : 0),
                    love_count:
                        post.love_count
                        + (post.my_reaction_id === REACTION_TYPE.LOVE ? -1 : 0)
                        + (reactionId === REACTION_TYPE.LOVE && post.my_reaction_id !== reactionId ? 1 : 0),
                };
            } else {
                return post;
            }
        }))
    }

    const value = {
        posts,
        loadInitialPosts,
        loadNewPosts,
        loadOlderPosts,
        addMyPost,
        removeMyPost,
        updateLikeCount,
    };

    return (
        <PostsContext.Provider value={value}>
            {props.children}
        </PostsContext.Provider>
    );
}