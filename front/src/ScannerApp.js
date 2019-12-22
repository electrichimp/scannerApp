import React, {useState, useEffect, useContext} from 'react';
import { EmpresaFechaContext } from './EmpresaFechaContext';
import { CerrarModalContext } from './CerrarModalContext';
import { CerrarGrupoContext } from './CerrarGrupoContext';
import { CounterContext } from './CounterContext';
import './App.scss';
import CodeCard from './CodeCard';
import CodeCardContainer from './CodeCardContainer';
import Button from './Button';
import Form from './Form';
import ContainerScanner from './ContainerScanner';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { QUERY_CODES, INSERT_CODE, UPDATE_CODE } from './common';
import { client } from './App';
import gql from 'graphql-tag';

function ScannerApp() {
  const [mensaje, setMensaje] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigos, setCodigos] = useState(JSON.parse(localStorage.getItem('codes')) || []);
  const [codSelecto, setCodSelecto] = useState('');
  const [tipoMsj, setTipoMsj] = useState('NORMAL');
  const {empresa, setEmpresa, fecha, setFecha} = useContext(EmpresaFechaContext);
  const {cerrarModal, setCerrarModal} = useContext(CerrarModalContext);
  const {cerrarGrupo, setCerrarGrupo} = useContext(CerrarGrupoContext);
  const {totalGrupo, setTotalGrupo, totalAnuladosGrupo, setTotalAnuladosGrupo} = useContext(CounterContext);
  const { data } =  useQuery(QUERY_CODES, { fetchPolicy: "no-cache" });
  const [insertCode] = useMutation(INSERT_CODE);
  const [updateCode] = useMutation(UPDATE_CODE);

  useEffect(() => localStorage.setItem('codes', JSON.stringify(codigos)), [codigos]);
  useEffect(() => setCodigos(JSON.parse(localStorage.getItem('codes')) || []), [empresa]);

  async function handleSubmit(e) {
    e.preventDefault();
    const codigosList = codigos.map( cod => cod.codigo );
    if (isNaN(codigo)) {
      setTipoMsj('NORMAL');
      setMensaje('ERROR: Eso no es un codigo de barras!')
    } else if (codigo.length > 22) {
      setTipoMsj('NORMAL');
      setMensaje('ERROR: Codigo muy largo!')
    } else if (codigo.length < 18){
      setTipoMsj('NORMAL');
      setMensaje('ERROR: Codigo muy corto!')
    } else if (codigosList.includes(codigo)) {
      setCodSelecto(codigo);
      const codig = codigos.find( cod => cod.codigo === codigo );
      if (codig.anulado) {
        setTipoMsj('ANULADO');
        setMensaje('El codigo se encuentra ANULADO! Desea activarlo?');
      } else {
        setTipoMsj('ANULAR');
        setMensaje('El codigo ya se encuentra en la lista! Desea ANULARLO?');
      }
    } else {
      const { codes } = data
      const codigosDB = codes.map( cod => cod.codigo );
      console.log( codigosDB );
      if (codigosDB.includes(codigo)) {
        const codi = codes.find( cod => cod.codigo === codigo );
        setTipoMsj('NORMAL');
        setMensaje(`El codigo pertenece a un grupo cerrado. Fue escaneado como ${codi.empresa} con fecha ${codi.fecha}.`);
      } else {
      setTipoMsj('NORMAL');
      setMensaje('Codigo ingresado 👍🏻');
      setCodigos(oldCodigos => [{ codigo, descripcion: 'PENDIENTE', mensaje: 'PENDIENTE', anulado: false, fecha: fecha, empresa: empresa }, ...oldCodigos]);
      setTotalGrupo(oldTotal => oldTotal + 1);
      await insertCode({ variables: { data: {codigo, descripcion: 'PENDIENTE', mensaje: 'PENDIENTE', anulado: false, fecha: fecha, empresa: empresa } } });
      }
    }
    setCodigo('');
  }

  const handleCodes = async () => {
   setCerrarModal(!cerrarModal);
  //  setMensaje('Grupo cerrado!');
  //  var len = codigos.length;
    // for (var i = 0; i < len; i++) {
    //     await insertCode({ variables: { data: {codigo: codigos[i], descripcion: 'PENDIENTE', anulado: false } } })
    // };
    // await insertCodes({ variables: { data: codesObj } });
    // setCodigos([]);
    // setMensaje('Grupo cerrado!')
  }

  const handleClose = (code) => {
    setCodSelecto(code);
    const codig = codigos.find( cod => cod.codigo === code );
    if (codig.anulado) {
      setTipoMsj('ANULADO');
      setMensaje('El codigo se encuentra ANULADO! Desea activarlo?');
    } else {
      setTipoMsj('ANULAR');
      setMensaje('El codigo ya se encuentra en la lista! Desea ANULARLO?');
    }
  };

  const renderBtns = {
    NORMAL:
      '',
    ANULAR: 
      <>
        <Button onClick={() => {setTipoMsj('NORMAL'); setMensaje('')}}>Continuar sin anular</Button>
        <Button onClick={() => {
          setCodigos( oldCodigos => oldCodigos.map(c => {
            if (c.codigo === codSelecto) {
              return {...c, anulado: true};
            } else {
              return c;
            }
          }));
          setTipoMsj('NORMAL');
          setMensaje('Vale anulado!');
          setTotalAnuladosGrupo(totalAnuladosGrupo + 1);
          (async () => await updateCode({ variables: { code: codSelecto, data: {anulado: true} } }))();
          }}>Anular Vale</Button>
      </>,
    ANULADO: 
      <>
        <Button onClick={() => {setTipoMsj('NORMAL'); setMensaje('')}}>Continuar sin activar</Button>
        <Button onClick={() => {
          setCodigos( oldCodigos => oldCodigos.map(c => {
            if (c.codigo === codSelecto) {
              return {...c, anulado: false};
            } else {
              return c;
            }
          }));
          setTipoMsj('NORMAL');
          setMensaje('Vale activado!');
          setTotalAnuladosGrupo(totalAnuladosGrupo - 1);
          (async () => await updateCode({ variables: { code: codSelecto, data: {anulado: false} } }))();
          }}>Activar Vale</Button>
      </>
  } [tipoMsj];

  return (
    <>
    { empresa && fecha ?
      <ContainerScanner>
        <Form action="" onSubmit={handleSubmit}>
          <h2> Escanea aqui 👇🏻</h2>
          <input type="text" autoFocus onChange={e => setCodigo((e.target.value).trim())} value={codigo}/>
        </Form>
        <div style={{gridArea: 'mensaje'}}>
          <div>{mensaje}</div>
          { renderBtns }
        </div>
        <Button color='#ff003f' style={{gridArea: 'close', alignSelf: 'start'}} onClick={handleCodes}>Cerrar grupo</Button>
        <CodeCardContainer>
          {codigos.map(c => <CodeCard code={c.codigo} anulado={c.anulado && true} handleClose={handleClose} id={c.codigo} key={c.codigo}/>)}
        </CodeCardContainer>
      </ContainerScanner>
      :
      <div>😇😇😇</div>
    }
    </>
  );
}

export default ScannerApp;
