import React, { createContext, useState, useEffect } from 'react';

export const LoginModalContext = createContext();

export function LoginModalProvider(props) {
    const [loginModal, setLoginModal] = useState(false);
    return(
        <LoginModalContext.Provider value={{loginModal, setLoginModal}}>
            {props.children}
        </LoginModalContext.Provider>
    );
}