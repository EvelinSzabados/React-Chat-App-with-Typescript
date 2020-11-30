import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { Statuses } from "./StatusTypes";
import { gql } from '@apollo/client';
import { client } from "../index"
import { ValidLoginContext } from "../Context/ValidLoginContext"

export type userData = {
    id: number | null,
    email: string | null,
    displayName: string | null,
    status: Statuses,
    profilePictureUrl?: string | null
}
let initialState = { id: null, email: null, displayName: null, status: Statuses.Offline, profilePictureUrl: null };

interface ContextState {
    currentUser: userData,
    setCurrentUser: Dispatch<SetStateAction<userData>>
}


export const UserContext = createContext<ContextState>(
    {
        currentUser: initialState,
        setCurrentUser: () => { }
    });

export const UserProvider = (props: { children: React.ReactNode; }): JSX.Element | null => {

    const [currentUser, setCurrentUser] = useState<userData>(initialState);
    const { validLogin } = useContext(ValidLoginContext)
    const GET_USER = gql`
    query currentUser {
        currentUser{id,displayName,email,status,profilePictureUrl}
    }
  `;
    useEffect(() => {
        if (validLogin) {
            client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'
            }).then(response => {
                setCurrentUser(response.data.currentUser)
            })
        }
        //eslint-disable-next-line
    }, [GET_USER, validLogin])



    return (
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    );
};

