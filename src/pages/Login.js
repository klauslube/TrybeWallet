import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      }, () => this.verifyLogin());
    };

    handleSubmit = (event) => {
      const { history, entraUser } = this.props;
      const { email } = this.state;
      event.preventDefault();
      entraUser(email);
      history.push('/carteira');
    };

    verifyLogin = () => {
      const NUM = 6;
      const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const { email, password } = this.state;
      return (
        (password.length >= NUM && emailFormat.test(email))
          ? this.setState({ disabled: false }) : this.setState({ disabled: true })
      );
    };

    render() {
      const { disabled } = this.state;
      return (
        <div>
          <form>
            <input
              placeholder="email"
              name="email"
              type="text"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
            <input
              placeholder="senha"
              name="password"
              type="text"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              onClick={ this.handleSubmit }
              disabled={ disabled }
            >
              Entrar

            </button>
          </form>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  entraUser: (email) => dispatch(logUser(email)),
});

Login.propTypes = {
  entraUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
