import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface ContextState {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const DrawerVisibleContext = createContext<ContextState>(
    {
        visible: false,
        setVisible: () => { }
    });

export const DrawerVisibleProvider = (props: { children: React.ReactNode; }) => {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <DrawerVisibleContext.Provider
            value={{ visible, setVisible }}>
            {props.children}
        </DrawerVisibleContext.Provider>
    );
};