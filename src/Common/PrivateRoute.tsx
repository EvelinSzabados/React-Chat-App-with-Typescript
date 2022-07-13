import React, { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";
import { UserContext } from '../Context/UserContext';

interface RedirectProps {
    component: (props: any) => JSX.Element,
    [rest: string]: any
}

export const PrivateRoute = ({ component: Component, ...rest }: RedirectProps) => {
    const { currentUser } = useContext(UserContext);

    return (<Route {...rest} render={(props) => (
        currentUser.id !== null
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />)
}