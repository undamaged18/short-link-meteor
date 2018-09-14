import { Meteor } from "meteor/meteor";
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signin from '../ui/Signin';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/links" replace />
    } else {
        return <Component />
    }
};
const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/" replace />
    } else {
        return <Component />
    }
};

export const routes = (
<Router history={browserHistory}>
    <Switch>
        <Route
        exact
        path="/"
        render={() => onEnterPublicPage(Signin)}
        />
        <Route
        exact
        path="/signup"
        render={() => onEnterPublicPage(Signup)}
        />
        <Route
        exact
        path="/links"
        render={() => onEnterPrivatePage(Link)}/>
        <Route
        component={NotFound}/>
    </Switch>
</Router>
);

export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);
    console.log('Is authenticated', isAuthenticated);

    if (isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace('/links');
    }
    if (!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace('/');
    }
}