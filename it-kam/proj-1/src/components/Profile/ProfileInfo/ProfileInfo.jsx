import React from "react";
import photo from "./../../../images/photo.png";
import css from "./ProfileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }
    let picture = props.profile.photos.small ? props.profile.photos.small : photo;

    return (
        <>
            <h1>Profile</h1>
            <section className={css.profile}>
                <span className={css.profile__picture}>
                    <img className={css.profile__picture_img} src={picture} alt="Profile pic ture"/>
                </span>
                <div className={css.profile__info}>
                    <h2>{ props.profile.fullName}</h2>
                    <p>Date of birth: 2 Jan</p>
                    <p>City: Minsk</p>
                    <p>Interests: {props.aboutMe}</p>               
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                </div> 
            </section>
        </>
    );
}
export default ProfileInfo;