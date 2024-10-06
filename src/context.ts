import { createContext, useContext } from "react";
import { AppData } from "./App";

/**
 * Creating a context and wrapping my App so that all components have access to Data without props
 * useProfileContext : custom hook to avoid compile erros on undefined Data
 */

export const ProfileContext = createContext<AppData | undefined>(undefined);

export function useProfileContext () {
    const data = useContext(ProfileContext);

    if( data === undefined){
        throw new Error('useProfileContext must be used with a ProfileContext')
    }

    return data;
}

