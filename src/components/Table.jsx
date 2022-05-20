import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../actions/index';

class Table extends Component {
  currencyNames = (obj) => {
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    return element[1].name;
  }

  currencyAsk = (obj) => {
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    const askValue = Number(element[1].ask).toFixed(2);
    return askValue;
  }

  totalValue = (obj) => {
    const { value } = obj;
    const element = Object.entries(obj.exchangeRates)
      .find((currency) => currency[0] === obj.currency);
    const convert = element[1].ask;
    return Number((value) * convert).toFixed(2);
  }

  // deleteExpense = ({ target }) => {
  //   const { expenses } = this.props;
  //   deleteExp(expenses);
  // }

  render() {
    const { expenses, deleteExp } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((obj) => (
              <tr key={ obj.id }>
                <td>{obj.description}</td>
                <td>{obj.tag}</td>
                <td>{obj.method}</td>
                <td>{Number(obj.value).toFixed(2)}</td>
                <td>{this.currencyAsk(obj)}</td>
                <td>{this.currencyNames(obj)}</td>
                <td>{this.totalValue(obj)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExp(obj.id) }
                  >
                    Editar/Excluir
                  </button>

                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExp: (id) => dispatch(deleteExpenses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
