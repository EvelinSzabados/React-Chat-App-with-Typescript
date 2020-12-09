import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';
import { Statuses } from "./StatusTypes";
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { useQuery, useSubscription } from '@apollo/client';
import { FriendContext } from "./FriendContext"
import { GET_REQUESTS, NOTIF_SUBSCRIPTION, ACCEPTED_NOTIF_SUBSCRIPTION, DECLINED_NOTIF_SUBSCRIPTION } from "../Common/GraphqlQueries"

export type notificationType = {
    id: number | null,
    sender: userData,
    reciever: userData
}
const initialState = [
    {
        id: null,
        sender: { id: null, email: null, displayName: null, status: Statuses.OFFLINE },
        reciever: { id: null, email: null, displayName: null, status: Statuses.OFFLINE },

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
    const { friends, setFriends } = useContext(FriendContext)
    const [notifications, setNotifications] = useState<notificationType[]>(initialState);

    const { data: sentRequestData } = useSubscription(NOTIF_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true,
    });

    const { data: acceptedRequestData } = useSubscription(ACCEPTED_NOTIF_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true,
    });

    const { data: declinedRequestData } = useSubscription(DECLINED_NOTIF_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true,
    });

    const { refetch } = useQuery(GET_REQUESTS, { skip: !validLogin, fetchPolicy: 'network-only' });
    useEffect(() => {
        refetch().then(res => { setNotifications(res.data.requests) })
        if (acceptedRequestData) {
            const newFriend = acceptedRequestData.acceptRequest.users.filter((user: userData) => user.id !== currentUser.id)[0]
            setFriends([...friends, newFriend])
        }
        //eslint-disable-next-line
    }, [sentRequestData, acceptedRequestData, declinedRequestData, currentUser])


    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
}