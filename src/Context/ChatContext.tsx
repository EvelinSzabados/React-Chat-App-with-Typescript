import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { UserContext } from '../Context/UserContext';
import { chatData } from './ChatData';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { gql, useQuery } from "@apollo/client";
import { client } from "../index";
import { ValidLoginContext } from "../Context/ValidLoginContext"


interface ContextState {
    chats: chatData[],
    setChats: Dispatch<SetStateAction<chatData[]>>
}


export const ChatContext = createContext<ContextState>(
    {
        chats: [],
        setChats: () => { }
    });

export const ChatProvider = (props: { children: React.ReactNode; }) => {

    const [chats, setChats] = useState<chatData[]>([]);
    const { setSelectedChat } = useContext(SelectedChatContext)
    const { currentUser } = useContext(UserContext);
    const { validLogin } = useContext(ValidLoginContext)


    const COMMENTS_QUERY = gql`
        query Chats {
            chats{
                    id,
                    lastUpdated,
                    messages{
                        id,
                        text,
                        sender{id,email,displayName,status,profilePictureUrl}},
                        users{id,email,displayName,status,profilePictureUrl}
                    }                  
            }
    `;
    const result = useQuery(
        COMMENTS_QUERY,
        { fetchPolicy: 'network-only' }
    );
    useEffect(() => {

        if (validLogin && currentUser.id !== null) {
            if (result) {
                if (result.data.chats[0] !== null && result.data.chats.length !== 0) {
                    setSelectedChat(result.data.chats[0].id)
                }
                setChats(result.data.chats)
            }
        }
    }
        //eslint-disable-next-line
        , [currentUser, validLogin])

    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};