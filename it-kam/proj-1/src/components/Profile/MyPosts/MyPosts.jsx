import React from "react";
import Post from "./Post/Post";
import photo from "../../images/photo.png";

function MyPosts() {

    let postsData = [
        {id: 1, photo: `${photo}`, text: "It was a long day, but I'm happy to announce that I've got a job!", likes: 235},
        {id: 2, photo: `${photo}`, text: "What about an interview?", likes: 233}
    ];
    let posts = postsData.map( (p) => {
        return(<Post photo={p.photo} text={p.text} likes={p.likes} />);
    } );

    return(
        <section className="my-posts">
            <h3>My posts</h3>
            {posts}
        </section>
    );
}

export default MyPosts;
