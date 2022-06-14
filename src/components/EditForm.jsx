import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateExpenses } from '../actions';
import styles from '../styles/editForm.module.css';

class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.expense.value,
      currency: props.expense.currency,
      method: props.expense.method,
      tag: props.expense.tag,
      description: props.expense.description,
      exchangeRates: props.expense.exchangeRates,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleEdit = () => {
    const { dispatch } = this.props;
    dispatch(updateExpenses(this.state));
  }

  render() {
    const { coins } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div className={ styles.wallet }>
        <form className={ styles.form }>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              data-testid="value-input"
              type="string"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
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
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              id="tag"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleEdit }
          >
            Editar despesa
          </button>
        </form>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

EditForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  expense: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EditForm);
