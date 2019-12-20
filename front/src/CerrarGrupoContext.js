import React, { createContext, useState, useEffect } from 'react';

export const CerrarGrupoContext = createContext();

export function CerrarGrupoProvider(props) {
    const [cerrarGrupo, setCerrarGrupo] = useState(false);
    // useEffect(() => localStorage.setItem('codes', JSON.stringify(codigos)), [codigos]);
    return(
        <CerrarGrupoContext.Provider value={{cerrarGrupo, setCerrarGrupo}}>
            {props.children}
        </CerrarGrupoContext.Provider>
    );
}