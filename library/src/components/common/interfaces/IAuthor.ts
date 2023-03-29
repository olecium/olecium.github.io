export interface IAuthor {
    id: string;
    description: string;
    name: string;
    surname: string;
}
export interface IAuthorsMap {
    [id: string]: IAuthor;
}
