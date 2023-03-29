import { usersAPI } from "./../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

// INITIAL STATE
let initialState = {
    users: [
    /*
        {
            id: 1,
            photo: `${usericon}`,
            name: "John Doyle",
            intro: "I'm a cool guy",
            followed: 1,
            location: {
                country: "United Kingdom",
                city: "London"
            }
        }, {
            id: 2,
            photo: `${usericon}`,
            name: "Mark Wimbledon",
            intro: "Business man",
            followed: 1,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 3,
            photo: `${usericon}`,
            name: "Andrea Nuki",
            intro: "Hi guys!",
            followed: 0,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 4,
            photo: `${usericon}`,
            name: "Buka Nuka",
            intro: "Hi guys!",
            followed: 0,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 5,
            photo: `${usericon}`,
            name: "ALina Dukale",
            intro: "Ladybird",
            followed: 1,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 6,
            photo: `${usericon}`,
            name: "Mika Tukani",
            intro: "Firefly",
            followed: 0,
            location: {
                country: "United Kingdom",
                city: "Colcester"
            }
        }, {
            id: 7,
            photo: `${usericon}`,
            name: "Bulek Mukin",
            intro: "Hi guys!",
            followed: 1,
            location: {
                country: "Nothern Ireland",
                city: "Belfast"
            }
        }, {
            id: 8,
            photo: `${usericon}`,
            name: "Kila Moore",
            intro: "Hi guys!",
            followed: 0,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 9,
            photo: `${usericon}`,
            name: "Victoria Mline",
            intro: "Hi guys!",
            followed: 0,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 10,
            photo: `${usericon}`,
            name: "Diana Opin",
            intro: "Ladybird",
            followed: 1,
            location: {
                country: "USA",
                city: "Maiami"
            }
        }, {
            id: 11,
            photo: `${usericon}`,
            name: "Lowrence Folk",
            intro: "Firefly",
            followed: 0,
            location: {
                country: "United Kingdom",
                city: "Colcester"
            }
        }, {
            id: 12,
            photo: `${usericon}`,
            name: "Liuba Binki",
            intro: "Hi guys!",
            followed: 1,
            location: {
                country: "Nothern Ireland",
                city: "Belfast"
            }
        }*/
    ],
    pageSize: 20,
    totalUsersCount: 50,    
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};
const LOAD_USERS = 'LOAD_USERS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

// REDUCER
const usersReducer = (state = initialState, action) => {
   
    switch(action.type){
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: 1})
                /* 
                users: state.users.map((u) => {
                    if(u.id === action.userID) {                        
                        return {...u, followed: 1};
                    }
                    return u;
                })*/
            }
        }        
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: 0})
                /*
                users: state.users.map((u) => {
                    if(u.id === action.userID) {                        
                        return {...u, followed: 0};
                    }
                    return u;
                })*/
            }
        }
        case LOAD_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.number
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }

        default: 
            return state;
    }
}

export default usersReducer;

// ACTION CREATORS
export const loadUsers = (users) => ({type: LOAD_USERS, users});
export const followUser = (userID) => ({type: FOLLOW, userID});
export const unfollowUser = (userID) => ({type: UNFOLLOW, userID});
export const setPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (number) => ({type: SET_TOTAL_USERS_COUNT, number});
export const setFetching = (isFetching) => ({type: TOGGLE_FETCHING, isFetching});
export const setFollowProgress = (isFetching, userId) => ({type: FOLLOWING_IN_PROGRESS, isFetching, userId});


// THUNK FUNCTIONS
export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setFetching(true));
    dispatch(setPage(currentPage));
    
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(loadUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));            
    dispatch(setFetching(false));
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setFollowProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setFollowProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {    
    followUnfollowFlow(dispatch, userId, usersAPI.followUser.bind(usersAPI), followUser);
}

export const unfollow = (userId) => async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollowUser);
}