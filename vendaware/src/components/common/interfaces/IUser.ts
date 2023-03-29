import {isUndefinedOrNull} from "../utils/typeGuard";

export interface IUser {
    id: string;
    email: string;
    forename: string;
    surname: string;
    role_id: string;
    org_id: string;
}
export type IUserInfoType = null | undefined | IUser;

export interface IUsersMap {
    [key :string]: IUser;
}
