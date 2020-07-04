import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../Colors';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex 1;
    height: 100%;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${(props: {flex: number}) => props.flex};
    justify-content: center;
    box-sizing: border-box;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    height: 64px;
    padding: 8px;
    box-shadow: 0 4px 2px -2px ${colors.GREY[700]};
    box-sizing: border-box;
`;

const Text = styled.div`
    font-size: ${({size}:{size: number})=>size}px;
    color: ${colors.GREY[900]};
    font-weight: 500;
    align-items: center;
    box-sizing: border-box;
`;

const List = styled.ul`
    display: flex;
    flex-direction: row;
    padding: 0 8px;
    justify-content: flex-end;
`;

const Item = styled.li`
    display: flex;
    flex-direction: row;
    padding: 0 8px;
    list-style-type: none;
`;

interface Props {
    children: React.ReactNode;
}

const Header: React.FC<Props> = ({children}: Props) => {
    return (
        <Container>
            <Row>
                <Section flex={8}>
                    <List>
                        <Item>
                            <Link to={'/expenses'}>
                                <Text size={16}>Expenses</Text>
                            </Link>
                        </Item>
                        <Item>
                            <Link to={'/settings'}>
                                <Text size={16}>Settings</Text>
                            </Link>
                        </Item>
                    </List>
                </Section>
            </Row>
            <Section flex={1}>{children}</Section>
        </Container>
    );
};

export {Header};
