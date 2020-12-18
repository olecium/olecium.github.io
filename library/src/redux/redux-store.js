import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "./app-reducer";
import booksReducer from "./books-reducer";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from "redux-form";
import headerReducer from "./header-reducer";


const reducers = combineReducers({
    header: headerReducer,
    auth: authReducer,
    booksPage: booksReducer,
    form: formReducer,
    app: appReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
