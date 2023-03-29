export interface IOrg {
    id: string;
    name: string;
    country: string;
    email: string;
    telephone: string;
}
export interface IOrgsMap {
    [id: string]: IOrg;
}
