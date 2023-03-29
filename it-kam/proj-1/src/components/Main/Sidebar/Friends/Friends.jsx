import React from "react";
import Friend from "./Friend/Friend";
import css from './Friends.module.scss';


const Friends = (props) => {

    let friends = props.friendList.map((f) => { return(<Friend name={f.name} surname={f.surname} key={f.id} id={f.id}/>); });
    return(
        <div className={css.friends_wrapper}>
            <h3 className={css.title_third}>Friends</h3>
            <div>
                <ul className={css.friends_list}>
                    {friends}
                </ul>
            </div>
        </div>
    );
}

export default Friends;
