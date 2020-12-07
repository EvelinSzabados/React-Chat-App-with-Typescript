import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { Statuses } from "./StatusTypes";
import { userData } from './UserContext';
import { ValidLoginContext } from "../Context/ValidLoginContext";
import { GET_USER } from "../Common/GraphqlQueries";
import { useQuery } from "@apollo/client";

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
    const { validLogin } = useContext(ValidLoginContext)
    const { refetch } = useQuery(GET_USER, { skip: !validLogin, fetchPolicy: 'network-only' });

    useEffect(() => {
        refetch().then(res => {
            let friends: userData[] = []
            res.data.currentUser.friends.forEach((friendship: any) => {
                (friendship.users.forEach((friend: userData) => {
                    if (friend.id !== res.data.currentUser.id) {
                        friends.push(friend)
                    }
                }
                ))
                setFriends([...friends])
            })

        })
        //eslint-disable-next-line
    }, [])

    return (
        <FriendContext.Provider
            value={{ friends, setFriends }}>
            {props.children}
        </FriendContext.Provider>
    );
};