// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const currenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        action.payload],
    };
  default:
    return state;
  }
};

export default currenciesReducer;
