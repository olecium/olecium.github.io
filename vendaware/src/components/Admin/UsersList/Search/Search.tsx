import React from 'react';
import css from './Search.module.scss';

export interface ISearchHandlers {
    searchItem: (email: string) => void;
}

const Search: React.FC<ISearchHandlers> = (props): React.ReactElement => {
    const searchItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.searchItem(event.target.value);
    }
    return(
        <div className={`${css.search} ${css.form_field}`}>
            <input className={css.field_input} onChange={searchItem} type="text" name="search" placeholder="john.doe@mail.com"/>
            <button className={css.button_primary}>Find user</button>
        </div>
    );
}

export default Search;