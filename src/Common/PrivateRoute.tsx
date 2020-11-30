import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ValidLoginContext } from "../Context/ValidLoginContext"
export function PrivateRoute<T extends RouteProps>({ component: Component, ...rest }: T) {
    const { validLogin } = useContext(ValidLoginContext)
    if (!Component) return null;

    return (<Route {...rest} render={(props) => (
        validLogin === true
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />)
}