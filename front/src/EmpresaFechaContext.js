import React, { createContext, useState, useEffect } from 'react';

export const EmpresaFechaContext = createContext();

export function EmpresaFechaProvider(props) {
    const [empresa, setEmpresa] = useState(JSON.parse(localStorage.getItem('empresa')) || '');
    const [fecha, setFecha] = useState(JSON.parse(localStorage.getItem('fecha')) || '');
    useEffect(() => localStorage.setItem('empresa', JSON.stringify(empresa)), [empresa]);
    useEffect(() => localStorage.setItem('fecha', JSON.stringify(fecha)), [fecha]);
    return(
        <EmpresaFechaContext.Provider value={{empresa, setEmpresa, fecha, setFecha}}>
            {props.children}
        </EmpresaFechaContext.Provider>
    );
}