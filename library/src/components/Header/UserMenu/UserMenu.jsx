import React, { Component } from "react";
import LogoutButton from "../Login/LogoutButton";


class UserMenu extends Component {
    constructor(props){
         super(props);

         this.state = {
            userMenu: false
         }
         this.userMenuToggle = this.userMenuToggle.bind(this);
    }

    userMenuToggle(){
        this.setState({
            userMenu: !this.state.userMenu
        })
    }

    render(){
         const user = this.props.user;
         return (
             <>
                 <button onClick={this.userMenuToggle} ><img src={user.picture} alt={user.name} width={"40"}/></button>
                 { this.state.userMenu &&
                     <div>
                         <h2>{user.name}</h2>
                         <p>{user.email}</p>
                         <p><a href="#">Избранное</a></p>
                         <LogoutButton />
                     </div>
                 }
             </>
         );
    }
}
export default UserMenu;
