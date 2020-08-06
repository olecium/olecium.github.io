import { getAuthUserData } from "./auth-reducer";

const INIT_SUCCESS = "SET_INITIALISED";

let initialState = {
    init: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case INIT_SUCCESS:
            return {
                ...state,
                init: true
            }
        default:
            return state;
    }
}
export default appReducer;

export const initSuccess = () => ({type: INIT_SUCCESS});

export const initApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initSuccess());
        });
    
}