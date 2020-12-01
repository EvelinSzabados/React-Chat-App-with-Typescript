import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';
import { Statuses } from "./StatusTypes";
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { client } from "../index";
import { gql, useSubscription } from '@apollo/client';

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


    const NOTIF_SUBSCRIPTION = gql`
        subscription sendRequest {
            sendRequest {
                id,
                sender{id,email,displayName,status,profilePictureUrl},
                reciever{id,email,displayName,status,profilePictureUrl},

            } 
        }
    `;

    const { data: sentRequestData, loading: sentRequestIsLoading } = useSubscription(NOTIF_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: currentUser.id === null && !validLogin,
        shouldResubscribe: true
    });


    useEffect(() => {
        if (validLogin && currentUser.id !== null) {
            client.query({
                query: gql`
            {
                requests{
                    id,
                    sender{id,email,displayName,status,profilePictureUrl},
                    reciever{id,email,displayName,status,profilePictureUrl}                          
            }}
            `,
                fetchPolicy: 'network-only'
            }).then((response: any) => {
                setNotifications(response.data.requests)
            })
        }
        //eslint-disable-next-line
    }, [currentUser, validLogin])

    useEffect(() => {
        if (validLogin && currentUser.id !== null) {
            let allNotifs = JSON.parse(JSON.stringify(notifications))
            if (!sentRequestIsLoading && sentRequestData) {
                allNotifs.push(sentRequestData.sendRequest)
                setNotifications([...allNotifs])
            }
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