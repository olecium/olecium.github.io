import React from "react";
import css from './Users.module.scss';
import usericon from "./../../images/usericon.png";
import {NavLink} from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);
    
    return(
        <section className={css.users}>
            <ul className={css.pagination}>
                {pages.map( p => {
                    return <li key={p} className={props.currentPage === p ? `${css.page} ${css.page__selected}` : css.page}>
                        <span onClick={() => {props.onPageChange(p)}}>{p}</span>
                    </li>
                } )}
                
            </ul>
            <ul className={css.users_list}>
            {
                props.users.map(u => {
                                                    
                    return(
                        <li key={u.id} className={css.user}>
                            <NavLink to={`/profile/${u.id}`} >View Profile</NavLink>
                            <div className={css.user_image__wrapper}>
                                <p><img className={css.user_image} src={ u.photos.small != null ? u.photos.small :usericon} alt=""/></p>
                                {
                                    u.followed
                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)} 
                                              className={`${css.user_follow__button} ${css.user_follow__button_active}`} 
                                              onClick={ () => { props.unfollow(u.id); } }>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)} 
                                              className={css.user_follow__button}  
                                              onClick={ () => { props.follow(u.id); } }>Follow</button>
                                }
                            </div>
                            <div className={css.user_info}>
                                <p className={css.user_name}>{u.name}</p>
                                <p>{u.status}</p>
                            {/*<p className={css.user_location}>{u.location.country}, {u.location.city}</p>*/}
                            </div>
                        </li>
                    );
                })
            }
            </ul>
            <button className={css.btn}>Load more</button>
        </section>    
    );
}

export default Users;