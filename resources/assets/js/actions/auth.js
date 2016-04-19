import fetch from 'isomorphic-fetch';
import { formatUrl, checkHttpStatus, parseJSON } from '../utils';
import { SIGNIN_USER_REQUEST, SIGNIN_USER_FAILURE, SIGNIN_USER_SUCCESS, SIGNOUT_USER } from '../constants';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

export function signinUserSuccess(token, remember) {
    if(remember == true) {
        localStorage.setItem('token', token);
    }
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: {
            token: token
        }
    }
}

export function signinUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: SIGNIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function signinUserRequest() {
    return {
        type: SIGNIN_USER_REQUEST
    }
}

export function signout() {
    localStorage.removeItem('token');
    return {
        type: SIGNOUT_USER
    }
}

export function signoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(signout());
        dispatch(push('/signin'));
    }
}

export function signinUser(username, password, remember=true, redirect="/") {
    return function(dispatch) {
        dispatch(signinUserRequest());
        return fetch(formatUrl('/auth/signin'), {
            method: 'post',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            try {
                let decoded = jwtDecode(response.token);
                dispatch(signinUserSuccess(response.token, remember));
                dispatch(push(redirect));
            } catch (e) {
                dispatch(signinUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid token'
                    }
                }));
            }
        })
        .catch(error => {
            dispatch(signinUserFailure(error));
        })
    }
}
