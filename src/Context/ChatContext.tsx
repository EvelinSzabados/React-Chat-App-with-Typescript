import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { chatData } from './ChatData';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { GET_CHATS } from "../Common/GraphqlQueries"
import { ValidLoginContext } from "../Context/ValidLoginContext"
import { useQuery } from '@apollo/client';

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
    const { validLogin } = useContext(ValidLoginContext)
    const { refetch } = useQuery(GET_CHATS, { skip: !validLogin, fetchPolicy: 'network-only' });

    useEffect(() => {
        refetch().then(res => {
            if (res.data.chats.length !== 0) {
                setSelectedChat(res.data.chats[0].id)
            }
            setChats(res.data.chats)
        })
        //eslint-disable-next-line
    }, [validLogin])


    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};