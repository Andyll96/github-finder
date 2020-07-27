import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        console.log(text);
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    };

    // Get User
    // Get single Github user
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    // Get Repos
    const getUserRepos = async username => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      }

    // Clear Users
    // Clears users from page
    const clearUsers = () => dispatch({ type: CLEAR_USERS })

    // Set Loading
    // we do this with the dispatch that was pulled from the useReducer Hook, what we dispatch is an object with a type. The reducer is gonna catch this and handle it
    const setLoading = () => dispatch({ type: SET_LOADING });

    // Basically we have to wrap the entire application with a Provider
    // The idea is that we're making this information available to the entire app
    // value will contain the data we want to make available to our component tree
    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}

export default GithubState