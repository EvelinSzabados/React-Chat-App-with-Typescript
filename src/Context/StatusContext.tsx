import React, { useState, createContext, Dispatch, SetStateAction } from "react";

export enum Statuses {
    Active = "Active",
    Busy = "Busy",
    Offline = "Offline"
}

interface ContextState {
    status: Statuses,
    setStatus: Dispatch<SetStateAction<Statuses>>
}


export const StatusContext = createContext<ContextState>(
    {
        status: Statuses.Active,
        setStatus: () => { }
    });

export const StatusProvider = (props: any): JSX.Element => {

    const [status, setStatus] = useState<Statuses>(Statuses.Active);

    return (
        <StatusContext.Provider
            value={{ status, setStatus }}>
            {props.children}
        </StatusContext.Provider>
    );
};