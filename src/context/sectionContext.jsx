import React, {createContext, useContext, useState} from "react";

export const ActiveSectionContext = createContext(null);

export default function ActiveSectionContextProvider({children}) {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <ActiveSectionContext.Provider
            value={{
                activeSection,
                setActiveSection,
            }}
        >
            {children}
        </ActiveSectionContext.Provider>
    );
}

export function useActiveSectionContext() {
    const context = useContext(ActiveSectionContext);

    if (context === null) {
        throw new Error(
            "useActiveSectionContext must be used within an ActiveSectionContextProvider"
        );
    }

    return context;
}
