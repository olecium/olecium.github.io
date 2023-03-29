import React from "react";
import Post from "./Post/Post";
import css from "./MyPosts.module.scss";

const MyPosts = React.memo(props => {
    
    let posts = props.posts.map( (p) => {
        return(<Post key={p.id} photo={p.photo} text={p.text} likes={p.likes} />);
    } );

    return(
        <section className={css.my_posts}>
            <h3>My posts</h3>
            {posts}
        </section>
    );

});

export default MyPosts;
