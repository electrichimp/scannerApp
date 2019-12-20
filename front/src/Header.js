import React, { useContext } from 'react';
import styled from 'styled-components';
import { EmpresaFechaContext } from './EmpresaFechaContext';
import { LoginModalContext } from './LoginModalContext';
import { CounterContext } from './CounterContext';
import Button from './Button';

const  HeaderContainer = styled.form`
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    padding: 2px 10px;
    justify-content: space-between;
    align-content: center;
`;

function Header(props){
    const { empresa, fecha } = useContext(EmpresaFechaContext);
    const { loginModal, setLoginModal } = useContext(LoginModalContext);
    const {totalGrupo, totalAnuladosGrupo } = useContext(CounterContext);
    const msj = empresa && fecha ? 'Cambiar' : 'Defina Empresa y Fecha'
    return(
        <HeaderContainer>
            <div>
                {empresa} {fecha}
                <Button style={{fontSize: '10px', padding: '4px 2px'}} onClick={e => {e.preventDefault(); setLoginModal(!loginModal)}}>{msj}</Button>
            </div>
            <div>Total: {totalGrupo} | Anulados: {totalAnuladosGrupo}</div>
        </HeaderContainer>
    );
};

export default Header;