import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../Colors';

const getWidth = ({width}: {width: number}) => width;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div<{width: number}>`
    display: flex;
    flex-direction: column;
    width: ${getWidth}px;
    border-radius: 10px;
    border: solid 1px ${colors.GREY[700]};
    box-shadow: 0 5px 10px 0 ${colors.GREY[500]};
    position: relative;
`;

const CloseIcon = styled.div`
    font-size: 24px;
    color: ${colors.GREY[900]};
    position: absolute;
    right: 8px;
    padding: 8px;
    border-radius: 100%;
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
                {children}
                <CloseIcon onClick={onClose}>&#x2715;</CloseIcon>
            </ModalContainer>
        </Container>
    );
};

export {Modal};
