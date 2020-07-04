import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../Colors';

interface Flex {
    flex?: number;
    alignItems?: string;
    justifyContent?: string;
}

const Flex = styled.div<Flex>`
    display: flex;
    flex: ${({flex}: {flex?: number}) => flex ?? 1};
    align-items: ${({alignItems}: {alignItems?: string}) => alignItems ?? 'flex-start'};
    justify-content: ${({justifyContent}: {justifyContent?: string}) =>
        justifyContent ?? 'flex-start'};
`;

const Section = styled(Flex)`
    flex-direction: column;
    width: 100%;
`;

const FlexContainer = styled(Flex)`
    flex-direction: column;
    font-style: normal;
    height: 100%;
`;

const Row = styled(Flex)`
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
`;

const getFontSize = ({fontSize}: {fontSize: number}) => fontSize;
const getFontWeight = ({fontWeight}: {fontWeight: number}) => fontWeight;

const TextContainer = styled.span<{fontSize: number; fontWeight: number}>`
    font-size: ${getFontSize}px;
    font-weight: ${getFontWeight};
`;

export {Section, FlexContainer, Row, TextContainer};
