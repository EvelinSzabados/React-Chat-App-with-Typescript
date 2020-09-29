import React, { useState, createContext, Dispatch, SetStateAction, useEffect, useContext } from "react";
import { UserContext } from '../Context/UserContext';
import { chatData, allChat } from './ChatData';
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

export const ChatProvider = (props: any): JSX.Element => {

    const [chats, setChats] = useState<chatData[]>([]);
    const { currentUser } = useContext(UserContext);


    useEffect(() => {
        setChats(allChat(currentUser.id));

    }, [currentUser])

    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};