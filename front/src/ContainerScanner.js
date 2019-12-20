import styled from 'styled-components';

const ContainerScanner = styled.div`
    display: grid;
    grid-template-columns: 1fr 10fr 4fr 3fr 3fr  1fr;
    grid-auto-rows: 150px 80px auto;
    grid-template-areas: 
        '. input   input   input   input   close'
        '. mensaje mensaje mensaje mensaje .    '
        '. codigos codigos codigos codigos .    ';
    align-items: center;
`;

export default ContainerScanner;