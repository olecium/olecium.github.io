import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CallableContext } from 'firebase-functions/lib/providers/https';


import {
    ICreateUserInfo,
} from './createSingleUser';


admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

/// firebase deploy --only functions:createUser
export const createUser = functions.https.onCall(async (data: ICreateUserInfo, context: CallableContext) => {
    const { createSingleUser } = require('./createSingleUser');
    try {
        await createSingleUser(data);
        console.info(`createUser.createSingleUser SUCCESS`);
        return null;
    }
    catch (error) {
        console.error(`createUser.createSingleUser  error=${error}`);
        throw new functions.https.HttpsError('internal', error);
    }
});
