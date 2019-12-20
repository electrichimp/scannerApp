import React, { createContext, useState } from 'react';

export const CerrarModalContext = createContext();

export function CerrarModalProvider(props) {
    const [cerrarModal, setCerrarModal] = useState(false);
    return(
        <CerrarModalContext.Provider value={{cerrarModal, setCerrarModal}}>
            {props.children}
        </CerrarModalContext.Provider>
    );
}