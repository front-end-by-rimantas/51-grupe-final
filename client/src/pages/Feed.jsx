import { FeedForm } from "../components/feed-form/FeedForm";
// import { Post } from "../components/posts/Post";

export function Feed() {
    let posts = [];

    // for (let i = 0; i < 10; i++) {
    //     posts.push(<Post />);
    // }

    if (posts.length === 0) {
        posts = <div className="alert alert-warning">Šiuo metu nėra jokio turinio. Būk pirmas ir parašyk tokią žinutę!</div>
    }

    return (
        <main>
            <div className="container px-4">
                <div className="row align-items-center g-lg-5">
                    <FeedForm />
                </div>
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-md-10 mx-auto col-lg-6 col-xl-5">
                        {posts}
                    </div>
                </div>
            </div>
        </main>
    );
}