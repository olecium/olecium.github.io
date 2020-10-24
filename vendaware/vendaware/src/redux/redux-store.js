import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import MenuReducer from "./menu-reducer";
import appReducer from "./app-reducer";
import {reducer as formReducer} from "redux-form";
import DashboardReducer from "./dashboard-reducer";

let reducers = combineReducers({
    dashboard: DashboardReducer,
    menu: MenuReducer,
    form: formReducer,
    app: appReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
