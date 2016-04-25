import fetch from 'isomorphic-fetch';
import { formatUrl, checkHttpStatus, parseJSON } from '../utils';
import { signinUserFailure } from './auth';
import { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA } from '../constants';
import { push } from 'react-router-redux';

export function receiveProtectedData(data, username) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data,
            name: username
        }
    }
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST
    }
}

export function fetchProtectedData(token) {

    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(formatUrl('/getdata?token='+token), {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `JWT ${token}`
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            dispatch(receiveProtectedData(response.data, response.username));
        })
        .catch(error => {
            if(error.response.status === 400 || error.response.status === 401) {
                dispatch(signinUserFailure(error));
                dispatch(push('/signin'));
            }
        })
    }
}
