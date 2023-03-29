import LogoutButton from "components/Login/LogoutButton";
import React from "react";
import { NavLink, Route, Switch } from 'react-router-dom';
import logo from 'images/vendaware_logo.png';
import css from "./Home.module.scss";
import Dashboard from './../Dashboard/Dashboard';
import MachineList from './../MachineList/MachineList';


const Home: React.FC = (): React.ReactElement => {

    return(
        <section>
            <header id="header">
                <NavLink to="/index">
                    <img src={logo} alt="" width="100"/>
                </NavLink>
                <NavLink to="/machines">Machines</NavLink>
                <LogoutButton />
            </header>
            <div>
                <Switch>
                    <Route path="/index" render={() => <Dashboard/>}  />
                    <Route path="/machines" render={() => <MachineList/>}  />
                </Switch>
            </div>
        </section>
    );
}
export default Home;