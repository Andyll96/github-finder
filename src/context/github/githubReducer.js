// The reducer is responsible for changing the state of certain components that need changing when something happens
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

// the reducer is just a function so we put this
export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return{
                ...state, 
                users: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case GET_USER:
            return{
                ...state,
                user: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                // We wanna return whatever is in the state, which is immutable
                // so we basically we have to make a copy of it and replace it with the copy. Think back to Comparitive programming languages class
                // We copy it with the spread operator ...
                ...state,
                loading: true
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        default:
            return state;
    }
}