import {salesAPI} from "../api/api";

let initialState = {
    graphic_menu_flag: false,
    goodSales: 0,
    failedSales: 0
};
const ADD_GRAPHIC = "ADD_GRAPHIC";
const SET_GOOD_SALES_DATA = "SET_GOOD_SALES_DATA";
const SET_FAILED_SALES_DATA = "SET_FAILED_SALES_DATA";
const SET_ALL_FAILED_SALES_DATA = "SET_ALL_FAILED_SALES_DATA";

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GRAPHIC: {
            return {
                ...state,
                graphic_menu_flag: true
            };
        }
        case SET_GOOD_SALES_DATA: {
            return {
                ...state,
                goodSales: action.goodSales
            }
        }
        case SET_FAILED_SALES_DATA: {
            return {
                ...state,
                failedSales: action.failedSales
            }
        }
        case SET_ALL_FAILED_SALES_DATA: {
            return {
                ...state,
                allFailedSales: action.allFailedSales
            }
        }
        default:
            return state;
    }
}

export default DashboardReducer;
// ACTION CREATORS
export const addGraphic = () => ({type: ADD_GRAPHIC});


export const setGoodSalesData = (goodSales) => ({
        type: SET_GOOD_SALES_DATA, goodSales
});
export const setFailedSalesData = (failedSales) => ({
        type: SET_FAILED_SALES_DATA, failedSales
});
export const setAllFailedSalesData = (allFailedSales) => ({
        type: SET_ALL_FAILED_SALES_DATA, allFailedSales
});

// THUNK
export const getGoodSalesData = () => async (dispatch) => {
    let response = await salesAPI.getTotalGoodSales();

    if (response.status === 200) {
        let goodSales = response.data[0].count;
        dispatch(setGoodSalesData(goodSales));
    }
}
export const getFailedSalesData = () => async (dispatch) => {
    let response = await salesAPI.getTotalFailedSales();

    if (response.status === 200) {
        let failedSales = response.data[0].count;
        dispatch(setFailedSalesData(failedSales));
    }
}
export const getAllFailedSalesData = () => async (dispatch) => {
    let response = await salesAPI.getFailedSales();

    if (response.status === 200) {
        let allFailedSales = response.data;
        //console.log(allFailedSales);
        dispatch(setAllFailedSalesData(allFailedSales));
    }
}
