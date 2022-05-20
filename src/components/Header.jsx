import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumValues = () => {
    const { expenses } = this.props;
    return expenses.reduce((total, curr) => {
      const { currency, value, exchangeRates } = curr;
      const convert = exchangeRates[currency].ask * value;
      return Number((convert + total).toFixed(2));
    }, 0);
  }

  render() {
    const { userName } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ userName }</span>
        <span data-testid="total-field">{this.sumValues()}</span>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
