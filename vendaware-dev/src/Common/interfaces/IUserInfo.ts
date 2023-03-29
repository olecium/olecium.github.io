import { isUndefinedOrNull } from "Common/utils/typeGuards";
import { validateEmail } from "Common/utils/validateEmail";

export interface IOrgs { 
    [key: string]: string;    // org uid -> org name
}

export enum UserTypeId {
    Administrator,
    Dashboard,
}
export interface IUserTypes {
    desc: string;
    id: number;
}
export const AllUserTypesDesc: ReadonlyArray<IUserTypes> = [
    {desc: 'System Admin', id: UserTypeId.Administrator},
    {desc: 'Dashboard', id: UserTypeId.Dashboard},
] as const;

export const getDescriptionFromType = (id: number): string => {
    const find: IUserTypes | undefined = AllUserTypesDesc.find( (u) => u.id === id );
    if (find) {
        return find.desc;
    }

    return `Unknown User Type`;
};

export const getUser = (userName: string, email: string): string => {
    if (validateEmail(email)) {
        const posAt: number = email.indexOf('@');
        const afterAt: string = email.substr(posAt + 1);
        const user: string = `${userName}@${afterAt}`;
        return user;
    }
    return '';
}

export interface IUserInfo {
    admin : boolean;
    email : string;
    name : string;
    userName: string;
    orgs : IOrgs;
    uid: string;
    type: UserTypeId;
    orgUid?: string;
}

export type IUserInfoType = null | undefined | IUserInfo;

export interface IUsersMap {
    [key :string]: IUserInfo;
}

export const getOrgsFromUser = (user: IUserInfo): IOrgs => {
    const orgs: IOrgs = user.orgs !== undefined ? user.orgs : {};
    return orgs;
};

export const getOrgUidFromUser = (user: IUserInfo | undefined | null): string | undefined => {
    if (user) {
        if (user.admin === true) {
            return user.uid;    
        }
        if (user.type === UserTypeId.Dashboard) {
            return user.uid; 
        }
        else {
            const orgUids = Object.keys(getOrgsFromUser(user)).filter((uid) => uid !== user.uid);
            if (orgUids.length === 1) {
                return orgUids[0];
            }
        }
    }

    return undefined;
};

export const getUserName = (userInfo: IUserInfoType): string => {
    if (!isUndefinedOrNull(userInfo)) {
        return userInfo.type === UserTypeId.Dashboard ? `Admin ${userInfo.name}` : userInfo.name;
    }
    return ``;
};