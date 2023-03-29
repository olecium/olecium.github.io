import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/firestore';

import { config } from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(config);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log(`firebase.auth().setPersistence SUCCESS`);
            // firebase.database.enableLogging(true);
        })
        .catch( (error) => {
            // tslint:disable-next-line:no-console
            console.error(`firebase.auth().setPersistence ERROR ${error.message}`);
        });

    firebase.firestore().enablePersistence()
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log(`firebase.firestore().enablePersistence SUCCESS`);
            // firebase.database.enableLogging(true);
        })
        .catch( (error) => {
            // tslint:disable-next-line:no-console
            console.error(`firebase.firestore().enablePersistence ERROR ${error.code} ${error.message}`);
        });
}


export const storage = firebase.storage().ref();
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const func = firebase.functions();
