import React from "react";
import {useAuth} from "./hooks/useAuth";

const LogoutButton = () => {
    const { signout } = useAuth();

    return (
        <button onClick={() => signout()}>
            Log Out
        </button>
    );
};

export default LogoutButton;
