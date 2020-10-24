import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0UserProfile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div>
                <p> Hello, {user.name}</p>
            </div>
        )
    );
};

export default Auth0UserProfile;
