import styled from 'styled-components';

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    left:0;
    display: grid;
    grid-template-columns: 1fr minmax(1fr, 50px) 1fr;
    grid-template-rows: 0.2fr 1fr 1fr;
    grid-template-areas: 
        '. . .'
        '. lf .'
        '. . .';
`;

const LoginForm = styled.form`
    background: white;
    color: black;
    grid-area: lf;
    display: grid;
    padding: 10px;
    border-radius: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50px 50px 50px 50px 50px;
    grid-template-areas:
        'msj   msj'
        'input1 input1'
        'input2 input2'
        'input3 input3'
        'can   ing';
    grid-auto-flow: row;
    justify-items: center;
    align-items: center;
    align-content: center;
    & input{
        width: 200px;
        padding: 5px;
        font-size: 15px;
    }
    & select {
        justify-items: center;
        width: 200px;
        padding: 10px;
        font-size: 15px;
    }
`;

const CerrarForm = styled.form`
    background: white;
    color: black;
    grid-area: lf;
    display: grid;
    padding: 10px;
    border-radius: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50px 50px 50px 50px;
    grid-template-areas:
        'msj   msj'
        'msj2  msj2'
        'input input'
        'can   ing';
    grid-auto-flow: row;
    justify-items: center;
    align-items: center;
    align-content: center;
    font-size: 12px;
    & input{
        width: 200px;
        padding: 5px;
        font-size: 15px;
    }
    & select {
        justify-items: center;
        width: 200px;
        padding: 10px;
        font-size: 15px;
    }
`;


export { ModalContainer, LoginForm, CerrarForm };