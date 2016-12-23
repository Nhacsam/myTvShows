import { connect } from 'react-redux';
import { register, updatePassword, updateUsername, updateEmail } from 'mySeries/src/modules/Login';
import Register from './Register';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  register: () => dispatch(register()),
  onUsernameChange: (username) => dispatch(updateUsername(username)),
  onPasswordChange: (password) => dispatch(updatePassword(password)),
  onEmailChange: (password) => dispatch(updateEmail(password)),
});

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;

