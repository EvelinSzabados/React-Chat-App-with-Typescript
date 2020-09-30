import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { UserContext } from './Context/UserContext';

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const { currentUser } = useContext(UserContext);

    return (<Route {...rest} render={(props) => (
        currentUser.id !== null
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />)
}