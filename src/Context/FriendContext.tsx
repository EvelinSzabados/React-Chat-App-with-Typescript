import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { Statuses } from "./StatusTypes";
import { UserContext, userData } from './UserContext';
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { client } from "../index";
import { gql } from '@apollo/client';

const initialState = [{ id: null, email: null, displayName: null, status: Statuses.Offline, friends: [] }];

interface ContextState {
    friends: userData[],
    setFriends: Dispatch<SetStateAction<userData[]>>
}


export const FriendContext = createContext<ContextState>(
    {
        friends: initialState,
        setFriends: () => { }
    });

export const FriendProvider = (props: { children: React.ReactNode; }): JSX.Element => {

    const [friends, setFriends] = useState<userData[]>(initialState);
    const { currentUser } = useContext(UserContext);
    const { validLogin } = useContext(ValidLoginContext)
    const GET_USER = gql`
    query currentUser {
        currentUser{
            id,
        friends{
            users{id,displayName,email,status,profilePictureUrl}}}
        }
  `;
    useEffect(() => {
        if (validLogin && currentUser.id !== null) {
            client.query({
                query: GET_USER,
                fetchPolicy: 'network-only'
            }).then(response => {
                let friends: userData[] = []
                response.data.currentUser.friends.forEach((user: any) => {
                    (user.users.forEach((friend: any) => {
                        if (friend.id !== response.data.currentUser.id) {
                            friends.push(friend)
                        }
                    }
                    ))
                })
                console.log(friends)
                setFriends([...friends])

            })
        }
        //eslint-disable-next-line
    }, [currentUser, validLogin])

    return (
        <FriendContext.Provider
            value={{ friends, setFriends }}>
            {props.children}
        </FriendContext.Provider>
    );
};