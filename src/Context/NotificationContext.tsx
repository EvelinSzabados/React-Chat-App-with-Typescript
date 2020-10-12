import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { userData } from './UserContext';
import { UserContext } from '../Context/UserContext';

export type notificationType = {
    id: string | null,
    sender: userData,
    reciever: userData,
    accepted: boolean
}

const notificationData = [
    {
        id: '1',
        sender: { id: '5', email: 'adam@gmail.com', displayName: 'Ádám Kovács' },
        reciever: { id: '1', email: 'evelin@gmail.com', displayName: 'Evelin Szabados' },
        accepted: false

    },
    {
        id: '2',
        sender: { id: '3', email: 'eszter@gmail.com', displayName: 'Eszter Lévai' },
        reciever: { id: '4', email: 'norbert@gmail.com', displayName: 'Norbert Aranyos' },
        accepted: false

    },
    {
        id: '3',
        sender: { id: '1', email: 'evelin@gmail.com', displayName: 'Evelin Szabados' },
        reciever: { id: '5', email: 'cecilia@gmail.com', displayName: 'Cecília Tóth' },
        accepted: false

    },]


const initialState = [
    {
        id: null,
        sender: { id: null, email: null, displayName: null },
        reciever: { id: null, email: null, displayName: null },
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

export const NotificationProvider = (props: any): JSX.Element => {
    const { currentUser } = useContext(UserContext);
    const [notifications, setNotifications] = useState<notificationType[]>(initialState);

    useEffect(() => {
        setNotifications(notificationData.filter(notification => notification.reciever.id === currentUser.id || notification.sender.id === currentUser.id))
    }, [currentUser])


    return (
        <NotificationContext.Provider
            value={{ notifications, setNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
};