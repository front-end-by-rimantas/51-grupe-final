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
    const { isLoggedIn } = useContext(UserContext);
    const [posts, setPosts] = useState(initialPostsContext.posts);

    useEffect(() => {
        if (isLoggedIn === true) {
            loadInitialPosts();
        }

        if (isLoggedIn === false) {
            setPosts(() => []);
        }
    }, [isLoggedIn]);

    // useEffect(() => {
    //     if (isLoggedIn !== true) {
    //         return;
    //     }

    //     const id = setInterval(() => {
    //         console.log('kartojasi...');
    //         loadNewPosts();
    //     }, 1000);

    //     loadNewPosts();

    //     return () => clearInterval(id);
    // }, [isLoggedIn]);

    function loadInitialPosts() {
        loadOlderPosts();
    }

    function loadNewPosts() {
        if (!isLoggedIn) {
            return;
        }

        const newestPostId = posts.at(0)?.id;

        fetch('http://localhost:5114/api/post/new/' + newestPostId, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setPosts(pre => [...data.posts, ...pre]);
            })
            .catch(console.error);
    }

    function loadOlderPosts(lastPostId) {
        fetch('http://localhost:5114/api/post', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setPosts(pre => [...pre, ...data.posts]);
            })
            .catch(console.error);
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