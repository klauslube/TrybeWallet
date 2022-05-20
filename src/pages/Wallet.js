import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCurrencies, fetchCurrenciesPrice } from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { getPrices, expenses } = this.props;
    const id = expenses.length;
    const expenseObj = {
      ...this.state,
      id,
    };
    getPrices(expenseObj);
    this.setState({ value: 0, method: 'Dinheiro', description: '' });
  }

  render() {
    const { coins } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <>
        <Header />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="number"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {coins.map((coin) => <option key={ coin }>{coin}</option>)}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              id="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(fetchCurrencies()),
  getPrices: (expense) => dispatch(fetchCurrenciesPrice(expense)),
});

Wallet.propTypes = {
  getCoins: PropTypes.func.isRequired,
  getPrices: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
