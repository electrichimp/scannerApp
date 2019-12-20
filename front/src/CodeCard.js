import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Card = styled.div`
    color: ${props => props.anulado ? "red" : "white"};
    font-size: 11px;
    padding: 4px 4px;
    border: 2px solid ${props => props.anulado ? "red" : "white"};
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    `;

const ButtonClose = styled.button`
    color: ${props => props.anulado ? "red" : "white"};
    font-size: 9px;
    padding: 1.5px 2px;
    border: 1px solid ${props => props.anulado ? "red" : "white"};
    border-radius: 100%;
    font-weight: bold;
    background: none;
    :hover {
        background-color: ${props => props.anulado ? "red" : "white"};
        color: #0072ff;
    }
    :focus {
        outline: none;
    }
    `;

function CodeCard(props) {
    const {code, handleClose, anulado} = props;
    return (
        <Card anulado={anulado}>
            {code}
            <ButtonClose anulado={anulado} onClick={() => handleClose(code)}>{ anulado ? <Icon type="plus" /> : <Icon type="close" />} </ButtonClose>
        </Card>
    );
}

export default CodeCard;