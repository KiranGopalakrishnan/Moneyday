import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section} from '../../common/styles/Styles';
import {Button} from '../../common/components/Button/Button';
import {colors} from '../../common/Colors';
import {useBoards, BoardsActions} from '../../reducers/BoardsReducer';
import {ExpenseList} from './ExpenseList';
import {Monday} from '../../common/ecosystem/Monday';
import {getAllBoards} from '../../services/Boards';
import {Expense} from '../../types';
import { getAllExpenses } from '../../services/Expenses';
import { Spinner } from '../../common/components/Spinner/Spinner';


const Container = styled(FlexContainer)`
    padding: 32px;
`;

interface Props {}

const Expenses: React.FC<Props> = ({}: Props) => {
    
    const [expenses, setExpenses] = React.useState([]);

    const [loading, setLoading] = React.useState(true);

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
            <Section flex={9}>
                {loading && <Spinner loading={loading} />}
                {!loading && <ExpenseList expenses={expenses} />}
            </Section>
        </Container>
    );
};

export {Expenses};
