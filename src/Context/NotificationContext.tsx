import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';
import { Statuses } from "./StatusTypes";

export type notificationType = {
    id: number | null,
    sender: userData,
    reciever: userData,
    accepted: boolean
}

const notificationData = [
    {
        id: 1,
        sender: { id: 5, email: 'adam@gmail.com', displayName: 'Ádám Kovács', status: Statuses.Offline },
        reciever: { id: 1, email: 'evelin@gmail.com', displayName: 'Evelin Szabados', status: Statuses.Offline },
        accepted: false

    },
    {
        id: 2,
        sender: { id: 3, email: 'eszter@gmail.com', displayName: 'Eszter Lévai', status: Statuses.Offline },
        reciever: { id: 4, email: 'norbert@gmail.com', displayName: 'Norbert Aranyos', status: Statuses.Offline },
        accepted: false

    },
    {
        id: 3,
        sender: { id: 1, email: 'evelin@gmail.com', displayName: 'Evelin Szabados', status: Statuses.Offline },
        reciever: { id: 6, email: 'cecilia@gmail.com', displayName: 'Cecília Tóth', status: Statuses.Offline },
        accepted: false

    },]


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
    const [notifications, setNotifications] = useState<notificationType[]>(initialState);

    useEffect(() => {
        setNotifications(notificationData.filter(notification => notification.reciever.id === currentUser.id || notification.sender.id === currentUser.id))
    }, [currentUser.id])


    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
};