import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface ContextState {

    currentUser: {},
    setCurrentUser: Dispatch<SetStateAction<{ id: null; email: null; displayName: null; }>>

}

const userData = {
    id: null,
    email: null,
    displayName: null
}

export const UserContext = createContext({} as ContextState);

export const UserProvider = (props: any) => {


    const [currentUser, setCurrentUser] = useState(userData);


    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};