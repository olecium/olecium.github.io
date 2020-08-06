import React from "react";

const AddPost = () => {
    return(
        <section className="add-post">
            <h3>Add post</h3>
            <p>
                <textarea name="usernews" id="usernews" cols="70" rows="3"></textarea>
            </p>
            <button type="submit">Send</button>
        </section>
    );
}
export default AddPost;
