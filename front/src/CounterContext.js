import React, { createContext, useState, useEffect } from 'react';

export const CounterContext = createContext();

export function CounterProvider(props) {
    const [totalGrupo, setTotalGrupo] = useState(localStorage.getItem('codes') ? (JSON.parse(localStorage.getItem('codes'))).length : 0);
    const [totalAnuladosGrupo, setTotalAnuladosGrupo] = useState(Number(JSON.parse(localStorage.getItem('totalAnuladosGrupo'))) || 0);
    useEffect(() => localStorage.setItem('totalGrupo', JSON.stringify(totalGrupo)), [totalGrupo]);
    useEffect(() => localStorage.setItem('totalAnuladosGrupo', JSON.stringify(totalAnuladosGrupo)), [totalAnuladosGrupo]);
    return(
        <CounterContext.Provider value={{totalGrupo, setTotalGrupo, totalAnuladosGrupo, setTotalAnuladosGrupo}}>
            {props.children}
        </CounterContext.Provider>
    );
}