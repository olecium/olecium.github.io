import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from './base';

/// https://firebase.google.com/docs/auth/web/manage-users
/// https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
/// https://firebase.google.com/docs/auth/web/auth-state-persistence
export const doCreateUserWithEmailAndPassword = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);
export const doSignInWithEmailAndPassword = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password);
export const doSignOut = () => auth.signOut();
export const getLoggedInUser = (): firebase.User | null => auth.currentUser;

export const getLoggedInUserUid = (): string | undefined => {
    if (auth.currentUser) {
        return auth.currentUser.uid;
    }
    return undefined;
}


// Password Reset
export const doPasswordReset = (email: string) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password: string): Promise<any> => { 
    return new Promise<any>((resolve, reject) => {
        if (auth.currentUser !== undefined && auth.currentUser !== null) {
            auth.currentUser.updatePassword(password)
            .then ((result) => {
                resolve(result);
            })
            .catch ((error) => {
                reject(error)
            });
        }
        else {
            reject(new Error('No current signed in user'));
        }
    });
};

export type User = firebase.User;


  