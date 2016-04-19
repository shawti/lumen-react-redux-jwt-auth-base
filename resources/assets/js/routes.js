import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/app';
import {requireAuth} from './components';
import HomeView from './views/HomeView';
import SigninView from './views/SigninView';
import ProtectedView from './views/ProtectedView';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="signin" component={SigninView}/>
        <Route path="protected" component={requireAuth(ProtectedView)}/>
    </Route>
);
