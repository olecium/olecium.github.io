import {authAPI} from "../api/api";
import { stopSubmit } from "redux-form";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

const authReducer = (state = initialState, action) => {

    switch(action.type){
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

export default authReducer;

// ACTION CREATORS
export const setAuthUserData = (userId, email, login, isAuth) => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}}
);

// THUNK

export const userLogin = (login, password) => async (dispatch) => {
    let response = await authAPI.authLogin(login, password);

    if(response.status === 200) {
        let {id, login} = response;
        const isAuth = true;
        dispatch(setAuthUserData(id, login, isAuth));
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Common error";
        let action = stopSubmit("login", {_error: errorMessage});
        dispatch(action);
    }
}
