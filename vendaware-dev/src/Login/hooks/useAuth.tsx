import React, { useState, useEffect, useContext, createContext } from "react";

import { getOrgUidFromUser, IUserInfo, IUserInfoType } from "Common/interfaces/IUserInfo";
import { isUndefinedOrNull } from "Common/utils/typeGuards";
import { getUserInfo } from "Login/dataservices/getUserInfo";

import { User } from "Storage/auth";
import { auth } from 'Storage/base';

export type IUserType = null | undefined | User;
export type ISignInType = (email: string, password: string) => Promise<IUserInfoType>;
export type ISignOutType = () => Promise<void>;

export interface IAuthContext {
    user: IUserType;
    userInfo: IUserInfoType;
    signin: ISignInType;
    signout: ISignOutType;
}

type DefaultValue = undefined;
export type AuthContextValue = IAuthContext | DefaultValue;

const AuthContext = createContext<AuthContextValue>(undefined);
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider: React.FC = ({ children }) => {
    const authContext = useAuthProvider();
    return <AuthContextProvider value={authContext}>{children}</AuthContextProvider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
};

// Provider hook that creates auth object and handles state
function useAuthProvider(): IAuthContext {
    const [user, setUser] = useState<null | User>(null);
    const [userInfo, setUserInfo] = useState<null | IUserInfo>(null);

    const signin = async (email: string, password: string): Promise<IUserInfoType> => {
        try {
            const response = await auth.signInWithEmailAndPassword(email, password);
            setUser(response.user);
            if (response.user !== null) {
                const result = await getUserInfo(response.user.uid);
                const userInfoData: IUserInfo = {
                    ...result,
                    orgUid: getOrgUidFromUser(result),
                }
                setUserInfo(userInfoData);
                                
                return userInfoData;
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw err;
        }
    };

    const signout = async (): Promise<void> => {
        await auth.signOut();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (isUndefinedOrNull(user)) {
                setUser(null);
                setUserInfo(null);
            }
        });

        return function cleanup() {
            unsubscribe();
        };

    }, []);

    // Return the user object and auth methods
    return {
        user,
        userInfo,
        signin,
        signout,
    } as const;
};