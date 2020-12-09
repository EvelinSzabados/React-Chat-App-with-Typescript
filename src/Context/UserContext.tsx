import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { Statuses } from "./StatusTypes";
import { GET_USER, STATUS_SUBSCRIPTION } from "../Common/GraphqlQueries";
import { ValidLoginContext } from "../Context/ValidLoginContext"
import { useQuery, useSubscription } from '@apollo/client';


export type userData = {
    id: number | null,
    email: string | null,
    displayName: string | null,
    status: Statuses,
    profilePictureUrl?: string,
    friends?: any
}
let initialState = { id: null, email: null, displayName: null, status: Statuses.OFFLINE, profilePictureUrl: '' };

interface ContextState {
    currentUser: userData,
    setCurrentUser: Dispatch<SetStateAction<userData>>
}


export const UserContext = createContext<ContextState>(
    {
        currentUser: initialState,
        setCurrentUser: () => { }
    });

export const UserProvider = (props: { children: React.ReactNode; }): JSX.Element | null => {

    const [currentUser, setCurrentUser] = useState<userData>(initialState);
    const { validLogin } = useContext(ValidLoginContext);

    const { refetch } = useQuery(GET_USER, { skip: !validLogin, fetchPolicy: 'network-only' });
    const { data: statusData } = useSubscription(STATUS_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true,
    });

    useEffect(() => {
        if (validLogin)
            refetch().then(res => { setCurrentUser(res.data.currentUser) })
        //eslint-disable-next-line
    }, [validLogin, statusData])

    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

