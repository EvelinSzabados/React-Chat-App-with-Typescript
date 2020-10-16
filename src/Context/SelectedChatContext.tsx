import React, { useState, createContext, Dispatch, SetStateAction } from "react";
;

interface ContextState {
    selectedChat: string,
    setSelectedChat: Dispatch<SetStateAction<string>>
}


export const SelectedChatContext = createContext<ContextState>(
    {
        selectedChat: '',
        setSelectedChat: () => { }
    });

export const SelectedChatProvider = (props: { children: React.ReactNode; }): JSX.Element => {

    const [selectedChat, setSelectedChat] = useState<string>('');


    return (
        <SelectedChatContext.Provider
            value={{ selectedChat, setSelectedChat }}>
            {props.children}
        </SelectedChatContext.Provider>
    );
};