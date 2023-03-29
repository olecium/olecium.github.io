import { useUserUpdate } from 'components/common/hooks/useUserUpdate';
import css from './UsersList.module.scss';
import React from 'react';
import User from './User';
import { IUser } from 'components/common/interfaces/IUser';
import { firestore } from 'Storage';
import { useAuth } from './../../Login/hooks/useAuth';
import Search from './Search/Search';
import { resetPassword } from './../../common/utils/resetPassword';
import { NavLink } from 'react-router-dom';

const UsersList: React.FC = (): React.ReactElement => {

    const {user} = useAuth();
    const {users} = useUserUpdate();
    const [userProps, setUserProps] = React.useState<IUser[]>([]);
    const [searchTerm, setSearchTerm] = React.useState(``);

    const setUsersList = () => {
        
        if(Object.keys(users).length > 0){
            const result: IUser[] = [];

            for(const k in users){
                const u = users[k];
                const up: IUser = {
                    ...u
                };
                result.push(up);
            }
            setUserProps(result);
        }
    }

    React.useEffect(() => {
        setUsersList();
    }, [users]);

    const deleteUser = async (userId: string) => {
        try {
            if(user === undefined || user === null) return;
            await firestore.collection("users").doc(userId).delete();
        } catch(err){
            console.log("User delete error: ", err);
        }
    }
    
    React.useEffect(() => {
        if(searchTerm !== ``) {
            const result = userProps.filter((user) => {
                const email = user.email;
                if(email.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return user;
                }
            });            
            setUserProps(result);
        } else {            
            setUsersList();
        }
    }, [searchTerm, users]);
    
    const searchItem = (email: string) => {
        setSearchTerm(email);
    }

    const resetPass = (email: string) => {
        resetPassword(email);
    }

    return(
        <div>
            <h1 className={css.primary_title}>Users</h1>
            <Search searchItem={searchItem}/>

            <ul className={css.users_list}>
            {
                userProps.map(u => {
                    return(                        
                        <User key={u.id} {...u} resetPassword={resetPass} deleteUser={deleteUser}/>
                    )
                })
            }
            </ul>
            <p>
                <NavLink className={css.button_primary} to={`admin/add-edit-user`}>Add New User</NavLink>            
            </p>
        </div>
    );
}

export default UsersList;