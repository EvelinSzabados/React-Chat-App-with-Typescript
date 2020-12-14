import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { chatData } from './ChatData';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { GET_CHATS, NEWCHAT_SUBSCRIPTION } from "../Common/GraphqlQueries"
import { ValidLoginContext } from "../Context/ValidLoginContext"
import { useQuery, useSubscription } from '@apollo/client';
import { UserContext } from "./UserContext";

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
    const { selectedChat, setSelectedChat } = useContext(SelectedChatContext)
    const { validLogin } = useContext(ValidLoginContext)
    const { currentUser } = useContext(UserContext);
    const { refetch } = useQuery(GET_CHATS, { fetchPolicy: 'network-only' });
    const { data: newChatData, loading: newChatDataIsLoading } = useSubscription(NEWCHAT_SUBSCRIPTION, {
        fetchPolicy: 'network-only',
        skip: !validLogin,
        shouldResubscribe: true,
    });

    useEffect(() => {
        let chatList = JSON.parse(JSON.stringify(chats))
        if (!newChatDataIsLoading && newChatData) {

            chatList.push(newChatData.newChat)
            setChats([...chatList])
            if (selectedChat === '') {
                setSelectedChat(newChatData.newChat.id)
            }

        }
        //eslint-disable-next-line
    }, [newChatData])

    useEffect(() => {

        refetch().then(res => {
            if (res.data.chats && res.data.chats.length !== 0) {
                setSelectedChat(res.data.chats[0].id)
            }
            setChats(res.data.chats)

        })
        //eslint-disable-next-line
    }, [validLogin, currentUser])


    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};