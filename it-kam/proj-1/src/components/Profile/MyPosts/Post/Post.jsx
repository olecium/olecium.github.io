import React from "react";
import s from './Post.module.scss';
import AddPost from "../AddPost/AddPost";

const Post = (props) => {
    return(
        <div className={s.post}>
            <span className={s.post__img}>
                <img className={s.post__pic} src={props.photo} alt="user picture"/>
            </span>
            <span>
                <p>{props.text}</p>
                <small>likes: {props.likes}</small>
            </span>
        </div>
    );
}
export default Post;
