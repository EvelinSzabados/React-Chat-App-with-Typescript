import React, { useState, createContext, Dispatch, SetStateAction } from "react";
import { Statuses } from "./StatusTypes";

export type userData = {
    id: string | null,
    email: string | null,
    displayName: string | null,
    status: Statuses
}
//initial state is filled for testing purposes
const initialState = { id: '1', email: 'evelin@gmail.com', displayName: 'Evelin Szabados', status: Statuses.Offline };

interface ContextState {
    currentUser: userData,
    setCurrentUser: Dispatch<SetStateAction<userData>>
}


export const UserContext = createContext<ContextState>(
    {
        currentUser: initialState,
        setCurrentUser: () => { }
    });

export const UserProvider = (props: { children: React.ReactNode; }): JSX.Element => {

    const [currentUser, setCurrentUser] = useState<userData>(initialState);

    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};