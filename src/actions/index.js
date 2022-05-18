// Coloque aqui suas actions
export const USER = 'USER';
export const CURRENCIES = 'CURRENCIES';

export const logUser = (payload) => ({
  type: USER,
  payload,
});

export const currencies = (payload) => ({
  type: CURRENCIES,
  payload,
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
