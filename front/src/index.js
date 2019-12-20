import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { EmpresaFechaProvider } from './EmpresaFechaContext';
import { LoginModalProvider } from './LoginModalContext';
import { CerrarModalProvider } from './CerrarModalContext';
import { CerrarGrupoProvider } from './CerrarGrupoContext';
import { CounterProvider } from './CounterContext';

ReactDOM.render(
<CounterProvider>
    <CerrarGrupoProvider>
        <EmpresaFechaProvider>
            <LoginModalProvider>
                <CerrarModalProvider>
                    <App />
                </CerrarModalProvider>
            </LoginModalProvider>
        </EmpresaFechaProvider>
    </CerrarGrupoProvider>
</CounterProvider>, document.getElementById('root'));

