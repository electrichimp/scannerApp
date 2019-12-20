import styled from 'styled-components';

const CodeCardContainer = styled.div`
    grid-area: codigos;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    margin: 10px;
    `;

export default CodeCardContainer;