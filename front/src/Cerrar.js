import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import Form from './Form';
import Button from './Button';
import { EmpresaFechaContext } from './EmpresaFechaContext';
import { CerrarModalContext } from './CerrarModalContext';
import { CerrarGrupoContext } from './CerrarGrupoContext';
import { CounterContext } from './CounterContext';
import { ModalContainer, CerrarForm } from './ModalContainer';

function Cerrar (props) {
    const [confirmacion, setConfirmacion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const { setFecha } = useContext(EmpresaFechaContext);
    const { cerrarModal, setCerrarModal } = useContext(CerrarModalContext);
    const { setCerrarGrupo } = useContext(CerrarGrupoContext);
    const {totalGrupo, setTotalGrupo, totalAnuladosGrupo, setTotalAnuladosGrupo} = useContext(CounterContext);
  
    function handleSubmit (e) {
      e.preventDefault();
      if (confirmacion.toLowerCase() === 'mika') {
          localStorage.removeItem('codes');
          localStorage.removeItem('fecha');
          setFecha('');
          setTotalGrupo(0);
          setTotalAnuladosGrupo(0);
          window.location.reload();
          setCerrarGrupo(true);
          setCerrarModal(!cerrarModal)
      } else {
        setMensaje("Contraseña errónea!")
      }
    };
  
      return (
          <ModalContainer>
              <CerrarForm action="">
                  <h2 style={{gridArea: 'msj'}}>RESUMEN > Total: {totalGrupo} | Anulados: {totalAnuladosGrupo}. Escriba contraseña de cierre</h2>
                  <div style={{color: 'red', gridArea: 'msj2'}}>{mensaje}</div>
                  <input type="password" autoFocus onChange={e => setConfirmacion(e.target.value)} value={confirmacion} placeholder=''
                  style={{gridArea: 'input'}}/>
                  <Button style={{gridArea: 'can'}} onClick={() => setCerrarModal(!cerrarModal)}>Cancelar</Button>
                  <Button style={{gridArea: 'ing'}} onClick={handleSubmit}>Ingresar</Button>
              </CerrarForm>
          </ModalContainer>
      );
  };
  
  export default Cerrar;