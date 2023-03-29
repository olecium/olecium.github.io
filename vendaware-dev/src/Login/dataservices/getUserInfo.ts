import { FS_USERS_PATH } from "Common/constants/FireStorePaths";
import { IUserInfo } from "Common/interfaces/IUserInfo";

import {
    firestore 
 } from 'Storage';

export const getUserInfo = async (uid: string): Promise<Readonly<IUserInfo>> => {
    const doc = await firestore.collection(FS_USERS_PATH).doc(uid).get();
    const user = doc.data();

    if (user) {
        const result: IUserInfo = {
            admin: user.admin,
            email: user.email,
            name: user.name,
            userName: user.userName,
            orgs: user.orgs,
            uid: doc.id,
            type: user.type
        }
        return result;
    }

    throw new Error(`getUser User: No user for with UID ${uid}`);
};