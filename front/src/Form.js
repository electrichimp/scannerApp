import styled from 'styled-components';

const Form = styled.form`
    grid-area: input;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 50px;
    grid-auto-flow: row;
    justify-items: center;
    align-items: center;
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

export default Form;