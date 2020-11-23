import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { UserContext } from '../Context/UserContext';
import { chatData } from './ChatData';
import { SelectedChatContext } from '../Context/SelectedChatContext';
import { client } from "../index"
import { gql } from "apollo-boost";

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

    const [chats, setChats] = useState<any[]>([]);
    const { currentUser } = useContext(UserContext);
    const { setSelectedChat } = useContext(SelectedChatContext);


    useEffect(() => {
        if (currentUser.id !== null) {

            client.query({
                query: gql`
                {
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
                `
            }).then((response: any) => {
                if (response.data.chats[0] !== null && response.data.chats.length !== 0) {
                    setSelectedChat(response.data.chats[0].id)
                }
                setChats(response.data.chats)
            })

        }

    }, [currentUser, setSelectedChat])

    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};