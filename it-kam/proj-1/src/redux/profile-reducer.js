import photo from "../images/photo.png";
import { profileAPI } from "./../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

// INITIAL STATE
let initialState = {
    posts: [
        {
            id: 1,
            photo: `${photo}`,
            text: "It was a long day, but I'm happy to announce that I've got a job!",
            likes: 235
        },
        {
            id: 2, 
            photo: `${photo}`, 
            text: "What about an interview?", 
            likes: 233
        }
    ],
    profile: null,
    status: ""
};

// REDUCER
const profileReducer = (state = initialState, action) => {   
    switch(action.type){        
        case ADD_POST: {      
            return {
                ...state,
                newPostText: '',
                posts: [ ...state.posts, {
                    id: 3,
                    photo: `${photo}`,
                    text: action.text,
                    likes: 0
                }]
            }; 
        }      
        case DELETE_POST: {      
            return {
                ...state,
                posts: [ ...state.posts.filter(p => p.id != action.postId)]
            }; 
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default: 
            return state;
    }
}

export default profileReducer;

// ACTION CREATORS

export const addPost = (text) => ({type: ADD_POST, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

// THUNK
export const setProfile = (userId) => async (dispatch) => {      
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

export const getStatus = (userId) => async (dispatch) => {      
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
}

export const updateStatus = (status) => async (dispatch) => {      
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}