import {Monday} from '../common/ecosystem/Monday';
import { get, post } from '../api/Api';
import { Expense } from '../types';
import {moneydayUrl} from './utils';

const getAllExpenses = () => {
    return get<{expenses: Expense[]}>(moneydayUrl('expenses'), {});
};

const addExpense = (expense: Expense) => {
    return post<Expense>(moneydayUrl('expenses'), {});
};

export {getAllExpenses, addExpense};