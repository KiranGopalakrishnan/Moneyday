import * as React from 'react';
import styled from 'styled-components';
import {colors} from '../../Colors';
import { Link, useLocation } from 'react-router-dom';

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
    height: 48px;
    padding: 8px;
`;

const Text = styled.div`
    font-size: ${({size}:{size: number})=>size}px;
    font-weight: 100;
    align-items: center;
    box-sizing: border-box;
`;

const List = styled.ul`
    display: flex;
    flex-direction: row;
    padding: 0 8px;
    justify-content: flex-end;
    margin: 4px 0;
`;

const Item = styled.li`
    display: flex;
    flex-direction: row;
    padding: 12px;
    border-radius: 20px;
    background: ${({selected}: {selected: boolean}) =>
        selected ? `${colors.ORANGE[800]}` : '#FFF'};
    color: ${({selected}: {selected: boolean}) => (selected ? `${colors.GREY[900]}` : '#FFF')};
    list-style-type: none;
    margin: 0 8px;
    a {
        color: ${({selected}: {selected: boolean}) => (selected ? '#FFF' : `${colors.GREY[900]}`)};
    }
`;

interface Props {
    children: React.ReactNode;
}

const Header: React.FC<Props> = ({children}: Props) => {

    const location = useLocation();

    const [selected,setSelected] = React.useState(null)

    React.useEffect(() => {
        const currentPage = location.pathname.split('/').reverse()[0];
        if (currentPage !== selected) {
            setSelected(currentPage);
        }
    }, [location.pathname]);

    return (
        <Container>
            <Row>
                <Section flex={8}>
                    <List>
                        <Item
                            onClick={() => setSelected('overview')}
                            selected={selected === 'overview'}
                        >
                            <Link
                                to={`/overview`}
                                style={{textDecoration: 'none'}}
                            >
                                <Text size={14}>Overview</Text>
                            </Link>
                        </Item>
                        <Item
                            onClick={() => setSelected('expenses')}
                            selected={selected === 'expenses'}
                        >
                            <Link
                                to={`/expenses`}
                                style={{textDecoration: 'none'}}
                            >
                                <Text size={14}>Expenses</Text>
                            </Link>
                        </Item>
                        <Item
                            onClick={() => setSelected('settings')}
                            selected={selected === 'settings'}
                        >
                            <Link
                                to={`/settings`}
                                style={{textDecoration: 'none'}}
                            >
                                <Text size={14}>Settings</Text>
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
