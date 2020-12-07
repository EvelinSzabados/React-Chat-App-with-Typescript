import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';
import { Statuses } from "./StatusTypes";
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { useQuery, useSubscription } from '@apollo/client';
import { GET_REQUESTS, NOTIF_SUBSCRIPTION } from "../Common/GraphqlQueries"

export type notificationType = {
    id: number | null,
    sender: userData,
    reciever: userData
}
const initialState = [
    {
        id: null,
        sender: { id: null, email: null, displayName: null, status: Statuses.Offline },
        reciever: { id: null, email: null, displayName: null, status: Statuses.Offline },

    },
];

interface ContextState {
    notifications: notificationType[],
    setNotifications: Dispatch<SetStateAction<notificationType[]>>
}


export const NotificationContext = createContext<ContextState>(
    {
        notifications: initialState,
        setNotifications: () => { }
    });

export const NotificationProvider = (props: { children: React.ReactNode }): JSX.Element => {
    const { currentUser } = useContext(UserContext);
    const { validLogin } = useContext(ValidLoginContext)
    const [notifications, setNotifications] = useState<notificationType[]>(initialState);

    const { data: sentRequestData, loading: sentRequestIsLoading } = useSubscription(NOTIF_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true,
    });

    const { refetch } = useQuery(GET_REQUESTS, { skip: !validLogin, fetchPolicy: 'network-only' });

    useEffect(() => {
        refetch().then(res => { setNotifications(res.data.requests) })
        //eslint-disable-next-line
    }, [])


    useEffect(() => {

        let allNotifs = JSON.parse(JSON.stringify(notifications))
        if (!sentRequestIsLoading && sentRequestData) {
            allNotifs.push(sentRequestData.sendRequest)
            setNotifications([...allNotifs])
        }

        //eslint-disable-next-line
    }, [sentRequestData, currentUser])

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
}