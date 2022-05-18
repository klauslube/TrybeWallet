import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ userName }</span>
        <span data-testid="total-field">0</span>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.user.email,
});

export default connect(mapStateToProps)(Header);
