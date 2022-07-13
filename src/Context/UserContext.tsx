import React, { useState, createContext, Dispatch, SetStateAction } from "react";

export type userData = {
    id: string | null,
    email: string | null,
    displayName: string | null
}
//initial state is filled for testing purposes
const initialState = { id: null, email: null, displayName: null };

interface ContextState {
    currentUser: userData,
    setCurrentUser: Dispatch<SetStateAction<userData>>
}


export const UserContext = createContext<ContextState>(
    {
        currentUser: initialState,
        setCurrentUser: () => { }
    });

export const UserProvider = (props: any): JSX.Element => {

    const [currentUser, setCurrentUser] = useState<userData>(initialState);

    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};