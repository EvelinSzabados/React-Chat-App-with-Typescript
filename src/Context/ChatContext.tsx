import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { UserContext } from '../Context/UserContext';
import { chatData, allChat } from './ChatData';
import { SelectedChatContext } from '../Context/SelectedChatContext';
;

interface ContextState {
    chats: chatData[],
    setChats: Dispatch<SetStateAction<chatData[]>>
}


export const ChatContext = createContext<ContextState>(
    {
        chats: [],
        setChats: () => { }
    });

export const ChatProvider = (props: any) => {

    const [chats, setChats] = useState<chatData[]>([]);
    const { currentUser } = useContext(UserContext);
    const { setSelectedChat } = useContext(SelectedChatContext);

    console.log(chats)
    useEffect(() => {
        if (currentUser.id !== null) {
            const allChatData = allChat(currentUser.id)
            setTimeout(() => setChats(allChatData), 2000);
            if (allChatData[0] !== null) {

                setSelectedChat(allChatData[0].chatId)
            }
        }

    }, [currentUser, setSelectedChat])

    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};