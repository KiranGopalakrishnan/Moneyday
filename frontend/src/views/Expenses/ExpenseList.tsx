import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer} from '../../common/styles/Styles';
import {Board} from '../../types/Boards';
import {colors} from '../../common/Colors';
import {Link} from 'react-router-dom';
import { Expense } from '../../types';

const Container = styled(FlexContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    height: 32px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    border-bottom: solid 1px ${colors.GREY[700]};
`;


const Item = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    color: ${colors.BLACK[100]};
`;

const Header = styled(Row)`
    border-bottom: solid 1px ${colors.GREY[800]};
    color: ${colors.GREY[800]};
    background: ${colors.GREY[500]};
`;


interface Props {
    expenses: Expense[];
}

const ExpenseList: React.FC<Props> = ({expenses}: Props) => {
    return (
        <Container>
            <Header>
                <Item>Expenses</Item>
            </Header>
            <Container>
                {expenses.map((expense: Expense) => {
                    return (
                        <Row key={expense.id}>
                            <Item>{expense.description}</Item>
                            <Item>{expense.date}</Item>
                        </Row>
                    );
                })}
            </Container>
        </Container>
    );
};

export {ExpenseList};
