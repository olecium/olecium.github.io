import React from "react";
import {useAuth} from "./hooks/useAuth";
import css from "./Login.module.scss";

const LogoutButton: React.FC = (): React.ReactElement => {
    const { signout } = useAuth();

    return (
        <button className={css.logout} onClick={() => signout()}>
            Log Out
        </button>
    );
};

export default LogoutButton;
