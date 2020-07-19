import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../Colors';

const getWidth = ({width}: {width: number}) => width;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    z-index: 9999;
    margin-top: 100px;
`;

const ModalContainer = styled.div<{width: number}>`
    display: flex;
    flex-direction: column;
    width: ${getWidth}px;
    border-radius: 10px;
    border: solid 1px ${colors.GREY[700]};
    box-shadow: 0 5px 10px 0 ${colors.GREY[500]};
    position: relative;
    z-index: 9999;
    background: #fff;
    justify-content: center;
`;

const CloseIcon = styled.div`
    font-size: 18px;
    color: ${colors.GREY[900]};
    position: absolute;
    padding: 8px;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    font-weight: 100;
    position: absolute;
    top: 8px;
    right: 8px;
    background: #F5F5F5;
    align-items: center;
    justify-content: center;
    display: flex;
`;

interface Props {
    width: number;
    children: React.ReactNode;
    onClose: () => any;
}

const Modal: React.FC<Props> = ({children, width, onClose}: Props) => {
    return (
        <Container>
            <ModalContainer width={width}>
                <CloseIcon onClick={onClose}>&#x2715;</CloseIcon>
                {children}
            </ModalContainer>
        </Container>
    );
};

export {Modal};
