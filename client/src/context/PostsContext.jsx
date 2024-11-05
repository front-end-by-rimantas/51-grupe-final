/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const initialPostsContext = {
    posts: [],
    loadInitialPosts: () => { },
    loadNewPosts: () => { },
    loadOlderPosts: () => { },
    addMyPost: () => { },
    removeMyPost: () => { },
    // changePostReaction: () => { },
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

    const value = {
        posts,
        loadInitialPosts,
        loadNewPosts,
        loadOlderPosts,
        addMyPost,
        removeMyPost,
    };

    return (
        <PostsContext.Provider value={value}>
            {props.children}
        </PostsContext.Provider>
    );
}