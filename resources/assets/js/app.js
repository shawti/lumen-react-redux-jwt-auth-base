import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/root';
import { signinUserSuccess } from './actions';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux'

const target = document.getElementById('app');

const store = configureStore(window.__INITIAL_STATE__, browserHistory);
const history = syncHistoryWithStore(browserHistory, store)

const node = (
    <Root store={store} history={history} />
);
let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(signinUserSuccess(token));
}else {
    store.dispatch(push('/signin'));
}

ReactDOM.render(node, target);
