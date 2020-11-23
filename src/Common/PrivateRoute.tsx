import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";
import { UserContext } from '../Context/UserContext';

export function PrivateRoute<T extends RouteProps>({ component: Component, ...rest }: T) {
    const { currentUser } = useContext(UserContext);
    if (!Component) return null;

    return (<Route {...rest} render={(props) => (
        localStorage.getItem('user') !== null
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />)
}