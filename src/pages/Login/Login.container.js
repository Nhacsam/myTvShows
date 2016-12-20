import { connect } from 'react-redux';
import { login, updatePassword, updateUsername } from 'mySeries/src/modules/Login';
import Login from './Login';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  sendLogin: () => dispatch(login()),
  onUsernameChange: (username) => dispatch(updateUsername(username)),
  onPasswordChange: (password) => dispatch(updatePassword(password)),
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;

