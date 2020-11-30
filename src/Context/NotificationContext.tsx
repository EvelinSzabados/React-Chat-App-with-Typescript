import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';
import { Statuses } from "./StatusTypes";
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { gql } from "@apollo/client";
import { client } from "../index";

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
        accepted: false

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

export const NotificationProvider = (props: { children: React.ReactNode; }): JSX.Element => {
    const { currentUser } = useContext(UserContext);
    const { validLogin } = useContext(ValidLoginContext)
    const [notifications, setNotifications] = useState<notificationType[]>(initialState);

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

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
}