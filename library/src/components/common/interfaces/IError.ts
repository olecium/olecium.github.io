export interface IError {
    field: string;
    error: string;
}
export interface IErrorMap {
    [field: string]: IError;
}
