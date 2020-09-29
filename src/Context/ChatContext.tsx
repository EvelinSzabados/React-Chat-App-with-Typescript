import React, { useState, createContext, Dispatch, SetStateAction } from "react";

type chatData = {
    id: string | null,
    email: string | null,
    displayName: string | null
}
const initialState = { id: null, email: null, displayName: null };

interface ContextState {
    chats: chatData,
    setChats: Dispatch<SetStateAction<chatData>>
}


export const ChatContext = createContext<ContextState>(
    {
        chats: initialState,
        setChats: () => { }
    });

export const ChatProvider = (props: any): JSX.Element => {

    const [chats, setChats] = useState<chatData>(initialState);

    return (
        <ChatContext.Provider
            value={{ chats, setChats }}>
            {props.children}
        </ChatContext.Provider>
    );
};