export interface ILanguageTerm {
    [field: string]: string;
}
export interface ILanguage {
    id: string;
    title: string;
    default?: boolean;
    terms?: ILanguageTerm[];
}
export interface ILanguageMap {
    [id: string]: string;
}
