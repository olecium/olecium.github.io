import { authAPI } from "./../api/api";
import { stopSubmit } from "redux-form";

// INITIAL STATE
let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};
const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';

// REDUCER
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
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}
});

// THUNK
export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.authMe();
    
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        const isAuth = true;
        dispatch(setAuthUserData(id, email, login, isAuth));
    }
}

export const userLogin = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.authLogin(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Common error";
        let action = stopSubmit("login", {_error: errorMessage});
        dispatch(action);
    }
}
export const userLogout = () => async (dispatch) => {
    let response = await authAPI.authLogout();
   
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    } 
}