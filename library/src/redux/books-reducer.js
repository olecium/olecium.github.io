import {booksAPI} from "../api/api";

let initialState = {
    books: []
}

const LOAD_BOOKS = 'LOAD_BOOKS';

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKS: {
            return {
                ...state,
                books: action.books
            }
        }
        default:
            return state;
    }

}
export default booksReducer;

// ACTION CREATORS
export const loadBooks = (books) => ({type: LOAD_BOOKS, books});

// THUNK FUNCTIONS
export const requestBooks = () => async (dispatch) => {
    let data = await booksAPI.getBooks();
    dispatch(loadBooks(data));
}

