import React, { useState, createContext, Dispatch, SetStateAction } from "react";
import { userData } from './UserContext';

// const initialState = [{ id: null, email: null, displayName: null }];

const initialState = [
    {
        id: '2',
        email: "tamas@gmail.com",
        displayName: "Tamás Sallai",

    },
    {
        id: '3',
        email: "eszter@gmail.com",
        displayName: "Eszter Lévai",

    },
    {
        id: '4',
        email: "nobert@gmail.com",
        displayName: "Norbert Aranyos",

    },

];

interface ContextState {
    friends: userData[],
    setFriends: Dispatch<SetStateAction<userData[]>>
}


export const FriendContext = createContext<ContextState>(
    {
        friends: initialState,
        setFriends: () => { }
    });

export const FriendProvider = (props: any): JSX.Element => {

    const [friends, setFriends] = useState<userData[]>(initialState);

    return (
        <FriendContext.Provider
            value={{ friends, setFriends }}>
            {props.children}
        </FriendContext.Provider>
    );
};