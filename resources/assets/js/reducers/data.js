import {createReducer} from '../utils';
import {RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST} from '../constants';

const initialState = {
    data: null,
    name: null,
    isFetching: false
};

export default createReducer(initialState, {
    [RECEIVE_PROTECTED_DATA]: (state, payload) => {
        return Object.assign({}, state, {
            'data': payload.data,
            'name': payload.name,
            'isFetching': false
        });
    },
    [FETCH_PROTECTED_DATA_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isFetching': true
        });
    }
});
