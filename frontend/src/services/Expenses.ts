import {Monday} from '../common/ecosystem/Monday';
import { get, post } from '../api/Api';
import { Expense } from '../types';
import { projectorUrl } from './utils';

const getAllExpenses = () => {
    return get<{expenses:Expense[]}>(projectorUrl​​('expenses'),{});
};

const addExpense = (expense: Expense) => {
    return post<Expense>(projectorUrl('expenses'), {});
};

export {getAllExpenses, addExpense};