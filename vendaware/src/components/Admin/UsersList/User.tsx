import React from "react";
import { IUser } from 'components/common/interfaces/IUser';
import { NavLink } from 'react-router-dom';
import css from './UsersList.module.scss';

export interface IUserHandlers {
    deleteUser: (id: string) => void;
    resetPassword: (email: string) => void;
}

const User: React.FC<IUser & IUserHandlers> = (props): React.ReactElement => {
    const deleteUser = () => {
        props.deleteUser(props.id);
    }
    const resetPassword = () => {
        props.resetPassword(props.email);
    }

    return(
        <li className={css.user}>
            <p className={css.user_email}>{props.email}</p>
            <div className={css.buttons}>
                <NavLink className={css.button_primary} to={`add-edit-user?id=${props.id}`}>Edit</NavLink>        
                <button className={`${css.button_primary} ${css.danger}`} onClick={resetPassword}>Reset Password</button>    
                <button className={`${css.button_primary} ${css.danger}`} onClick={deleteUser}>Delete</button>            
            </div>
        </li>
    );
}

export default User;