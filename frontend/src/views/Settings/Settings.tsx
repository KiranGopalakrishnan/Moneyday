import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../common/styles/Styles';
import {Button} from '../../common/components/Button/Button';
import {colors} from '../../common/Colors';
import {useBoards, BoardsActions} from '../../reducers/BoardsReducer';
import {Monday} from '../../common/ecosystem/Monday';
import {getAllBoards} from '../../services/Boards';
import {Expense} from '../../types';
import {getAllExpenses} from '../../services/Expenses';
import {Spinner} from '../../common/components/Spinner/Spinner';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { General } from './General/General';
import { Rates } from './Rates/Rates';

const Container = styled(FlexContainer)`
    padding: 32px;
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
    flex-direction: column;
    padding: 0 8px;
    justify-content: flex-end;
`;

const Item = styled.li`
    display: flex;
    flex-direction: row;
    padding: 8px;
    list-style-type: none;
`;

const Sidebar = styled(Section)`
    border-right: solid 1px ${colors.GREY[500]};
    height: 500px;
`;

interface Props {}

const Settings: React.FC<Props> = ({}: Props) => {

    const [expenses, setExpenses] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

    let {path, url} = useRouteMatch();

    React.useEffect(() => {
        getAllExpenses()
            .then(({expenses}: {expenses: Expense[]}) => {
                setExpenses(expenses);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <Container>
            <Row>
                <Sidebar flex={1}>
                    <List>
                        <Item>
                            <Link to={`${url}`}>General</Link>
                        </Item>
                        <Item>
                            <Link to={`${url}/rates`}>Rates</Link>
                        </Item>
                    </List>
                </Sidebar>
                <Section flex={9}>
                    <Switch>
                        <Route exact path={`${url}`}>
                            <General />
                        </Route>
                        <Route exact path={`${url}/rates`}>
                            <Rates />
                        </Route>
                    </Switch>
                </Section>
            </Row>
        </Container>
    );
};

export {Settings};
