import React, { useState, createContext, Dispatch, SetStateAction } from "react";

type userData = {
    id: string | null,
    email: string | null,
    displayName: string | null
}

interface ContextState {

    currentUser: {},
    setCurrentUser: Dispatch<SetStateAction<userData>>
}
const initialState = { id: null, email: null, displayName: null };

export const UserContext = createContext({} as ContextState);

export const UserProvider = (props: any): JSX.Element => {


    const [currentUser, setCurrentUser] = useState<userData>(initialState);

    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};