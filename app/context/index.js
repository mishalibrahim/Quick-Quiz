'use client'
import { createContext, useContext, useState } from 'react';

const AppContext = createContext([]);

export function AppWrapper({children}) {
    const [userAnswers, setUserAnswers] = useState([]);
    return(
        <AppContext.Provider value={{userAnswers, setUserAnswers}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}
