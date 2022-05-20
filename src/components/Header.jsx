import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumValues = () => {
    const { expenses } = this.props;
    return expenses.reduce((total, curr) => {
      const { currency, value, exchangeRates } = curr;
      const convert = exchangeRates[currency].ask * value;
      return (convert + total);
    }, 0);
  }

  render() {
    const { userName } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ userName }</span>
        <span data-testid="total-field">{Number(this.sumValues()).toFixed(2)}</span>
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
