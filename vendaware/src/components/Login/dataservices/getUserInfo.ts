import { FS_USERS_PATH } from "components/common/constants/FireStorePaths";
import { IUser } from "components/common/interfaces/IUser";

import {
    firestore
} from '../../../Storage';

export const getUserInfo = async (uid: string): Promise<Readonly<IUser>> => {
    const doc = await firestore.collection(FS_USERS_PATH).doc(uid).get();
    const user = doc.data();

    if (user) {
        const result: IUser = {
            id: doc.id,
            email: user.email,
            forename: user.forename,
            surname: user.surname,
            role_id: user.role_id,
            org_id: user.org_id
        }
        return result;
    }

    throw new Error(`getUser User: No user for with UID ${uid}`);
};
