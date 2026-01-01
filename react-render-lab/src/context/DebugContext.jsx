import { createContext, useState } from "react";

export const DebugContext = createContext(null);

export function DebugProvider({ children }) {
    const [debugOn, setDebugOn] = useState(true);

    const toggleDebug = () => {
        setDebugOn((prev) => !prev);
    };

    return (
        <DebugContext.Provider value={{ debugOn, toggleDebug}}>
            {children}
        </DebugContext.Provider>
    )
}