import React from "react";
import css from './Post.module.scss';

const Post = (props) => {
    return(
        <div className={css.post}>
            <span className={css.post__img}>
                <img className={css.post__pic} src={props.photo} alt="user pic ture"/>
            </span>
            <span>
                <p>{props.text}</p>
                <small>likes: {props.likes}</small>
            </span>
        </div>
    );
}
export default Post;
