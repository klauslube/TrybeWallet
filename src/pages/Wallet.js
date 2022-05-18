import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { coins } = this.props;
    coins();
  }

  render() {
    return (
      <div>
        <Header />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  coins: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  coins: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
