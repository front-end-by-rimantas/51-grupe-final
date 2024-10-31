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
    const newestPostId = posts.at(0)?.id;
    const oldestPostId = posts.at(-1)?.id;

    useEffect(() => {
        if (isLoggedIn) {
            loadInitialPosts();
        } else {
            setPosts(() => []);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isLoggedIn) {
                loadNewPosts();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isLoggedIn]);

    function loadInitialPosts() {
        loadOlderPosts();
    }

    function loadNewPosts() {
        console.log('GET: new posts....');
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
            .catch(console.error)
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