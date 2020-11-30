import React, { useState, createContext, Dispatch, SetStateAction } from "react";

interface ContextState {
    validLogin: boolean,
    setValidLogin: Dispatch<SetStateAction<boolean>>
}


export const ValidLoginContext = createContext<ContextState>(
    {
        validLogin: false,
        setValidLogin: () => { }
    });

export const ValidLoginProvider = (props: { children: React.ReactNode; }): JSX.Element | null => {

    const [validLogin, setValidLogin] = useState(sessionStorage.getItem('user') !== null);

    return (
        <ValidLoginContext.Provider
            value={{ validLogin, setValidLogin }}>
            {props.children}
        </ValidLoginContext.Provider>
    );
};

