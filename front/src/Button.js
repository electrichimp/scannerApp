import styled from 'styled-components';

const Button = styled.button`
    color: white;
    font-size: 15px;
    padding: 8px 4px;
    border: 2px solid ${props => props.color ? props.color : "black"};
    font-weight: bold;
    border-radius: 6px;
    margin: 10px;
    background: ${props => props.color ? props.color : "black"};
    :hover {
        border: 2px solid white;
        background-color: white;
        color: ${props => props.color ? props.color : "black"}
    }
    :focus {
        outline: none;
    }
`;

export default Button;