import * as admin from 'firebase-admin';


//	Create some interface to call function with:
export interface ICreateUserInfo {
    email: string;
    password: string;
    forename: string;
    surname: string;
    org_id: string;
    role_id: string;
}

export const createSingleUser = async (data: ICreateUserInfo): Promise<void> => {
	const userRecord: admin.auth.UserRecord = await admin.auth().createUser(
			{
				email: data.email,
				password: data.password,
				displayName: `${data.forename} ${data.surname}`,
				disabled: false
			});

	await admin.firestore().collection(`users`).doc(userRecord.uid).set(
		{
			id: userRecord.uid,
			email: data.email,
			forename: data.forename,
			surname: data.surname,
			org_id: data.org_id,
			role_id: data.role_id,
		});

};

