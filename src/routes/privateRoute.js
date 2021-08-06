import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utility/commonFunctions';


const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = JSON.parse(isAuthenticated());
        
       
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && !roles.includes(currentUser.role)) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
export default PrivateRoute;
