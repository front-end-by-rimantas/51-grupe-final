import { useContext } from "react";
import { FeedForm } from "../components/feed-form/FeedForm";
import { PostsContext } from "../context/PostsContext";
import { Post } from "../components/posts/Post";

export function Feed() {
    const { posts, loadOlderPosts } = useContext(PostsContext);
    const empty = <div className="alert alert-warning">Šiuo metu nėra jokio turinio. Būk pirmas ir parašyk tokią žinutę!</div>;

    return (
        <main>
            <div className="container px-4">
                <div className="row align-items-center g-lg-5">
                    <FeedForm />
                </div>
                <div className="row align-items-center g-lg-5 pt-5">
                    <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                        {
                            posts.length === 0
                                ? empty
                                : posts.map(post => <Post key={post.id} post={post} />)
                        }
                    </div>
                </div>
                <div className="row align-items-center g-lg-5 py-5">
                    <button className="btn btn-primary" onClick={loadOlderPosts} type="button">Load more...</button>
                </div>
            </div>
        </main>
    );
}