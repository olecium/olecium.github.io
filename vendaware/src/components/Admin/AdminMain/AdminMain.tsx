import { UserUpdateProvider } from "components/common/hooks/useUserUpdate";
import React from "react";
import { NavLink, Route } from "react-router-dom";
import AddEditUser from "../AddEditUser/AddEditUser";
import Menu from "../Menu/Menu";
import UsersList from "../UsersList/UsersList";
import logo from 'images/vendaware_logo.png';

const AdminMain: React.FC = (): React.ReactElement => {
    return(
      <main>        
        <header id="header">
            <NavLink to="/">
                <img src={logo} alt="" width="100"/>
            </NavLink>       
            <Menu />
        </header> 
        <section>
            <Route path="/admin" exact render={() => <UserUpdateProvider>
                                                    <UsersList />
                                                </UserUpdateProvider>}  />
            <Route path="/admin/users" render={() => <UserUpdateProvider>
                                                        <UsersList />
                                                    </UserUpdateProvider>} />
            <Route path="/admin/add-edit-user" component={AddEditUser} />
        </section>
      </main>
    );
  }
  export default AdminMain;