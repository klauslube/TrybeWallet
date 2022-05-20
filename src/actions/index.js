// Coloque aqui suas actions
export const USER = 'USER';
export const CURRENCIES = 'CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const logUser = (payload) => ({
  type: USER,
  payload,
});

export const currencies = (payload) => ({
  type: CURRENCIES,
  payload,
});

export const expenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  payload: id,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    const coinsArray = Object.keys(result);
    dispatch(currencies(coinsArray));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrenciesPrice = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    delete result.USDT;
    dispatch(expenses({ ...expense, exchangeRates: result }));
  } catch (error) {
    console.log(error);
  }
};
