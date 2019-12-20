import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import Form from './Form';
import Button from './Button';
import { EmpresaFechaContext } from './EmpresaFechaContext';
import { LoginModalContext } from './LoginModalContext';
import { ModalContainer, LoginForm } from './ModalContainer';

function Login (props) {
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const {empresa, setEmpresa, setFecha} = useContext(EmpresaFechaContext);
  const {loginModal, setLoginModal} = useContext(LoginModalContext);
  const [password, setPassword] = useState('');
  const empresas = ['EyJ', 'Nutriabastos'];
  const fechas = ['17/12', '18/12', '19/12', '20/12', '21/12', '22/12', '23/12', '24/12', '25/12', '26/12', '27/12', '28/12', '29/12', '30/12', '31/12'];

  function handleSubmit (e) {
    e.preventDefault();
    if (password === 'travis') {
        !empresa && setEmpresa(company);
        setFecha(date);
        setLoginModal(!loginModal);
    } else {
        !empresa && setCompany('');
        setDate('');
    }
  };

  const renderEmpresa = empresa ?
        <div style={{gridArea: 'input1'}}>{empresa}</div>
        :
        <select value={company} onChange={e => setCompany(e.target.value)} style={{gridArea: 'input1'}}>
            <option value='' disabled='True'>Seleccionar empresa</option>
            { empresas.map( emp => <option value={emp} key={emp}>{emp}</option>) }
        </select>

    return (
        <ModalContainer>
            <LoginForm action="">
                <h2 style={{gridArea: 'msj'}}> Cambiar datos </h2>
                { renderEmpresa }
                <select value={date} onChange={e => setDate(e.target.value)} style={{gridArea: 'input2'}}>
                    <option value='' disabled='True'>Seleccionar fecha</option>
                    { fechas.map( fe => <option value={fe} key={fe}>{fe}</option>) }
                </select>
                <input type="password" autoFocus onChange={e => setPassword(e.target.value)} value={password} placeholder='Contraseña'
                style={{gridArea: 'input3'}}/>
                <Button style={{gridArea: 'can'}} onClick={() => setLoginModal(!loginModal)}>Cancelar</Button>
                <Button style={{gridArea: 'ing'}} onClick={handleSubmit}>Ingresar</Button>
            </LoginForm>
        </ModalContainer>
    );
};

export default Login;