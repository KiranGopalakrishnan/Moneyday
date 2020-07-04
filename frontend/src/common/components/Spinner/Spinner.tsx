import * as React from 'react';
import styled, { css } from 'styled-components';
import {colors} from '../../Colors';
import {Link} from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

interface Props {
    loading: boolean;
}

const Spinner: React.FC<Props> = ({loading}: Props) => {
    return (
        <Container>
            <PulseLoader size={16} color={colors.YELLOW[500]} loading={loading} />
        </Container>
    );
};

export {Spinner};
