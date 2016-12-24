import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton } from 'mySeries/src/components';
import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  fieldsContent: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  input: {
    height: 50,
    alignSelf: 'stretch',

    borderColor: appStyle.colors.lightPlaceholder,
    borderWidth: 1,
    borderRadius: 6,

    color:  appStyle.colors.lightText,

    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

class Register extends Component {
  render() {
    return (
      <View style={styles.fieldsContent}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={this.props.onUsernameChange}
          placeholderTextColor={appStyle.colors.lightPlaceholder}
          autoFocus
          returnKeyType="next"
          onSubmitEditing={() => this.refs.email.focus()}
          />
        <TextInput
          ref='email'
          style={styles.input}
          placeholder="email"
          onChangeText={this.props.onEmailChange}
          placeholderTextColor={appStyle.colors.lightPlaceholder}
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => this.refs.password.focus()}
          />
        <TextInput
          ref='password'
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={this.props.onPasswordChange}
          placeholderTextColor={appStyle.colors.lightPlaceholder}
          onSubmitEditing={() => this.props.register()}
          returnKeyType="send"
          />
        <LoginButton onPress={() => this.props.register()}
                     isFetching={this.props.requestState.fetching}
                     isError={this.props.requestState.fail}
                     isSuccess={this.props.requestState.success}

          >Send</LoginButton>
      </View>
    );
  }
}

Register.propTypes = {
  onUsernameChange: PropTypes.func,
  onEmailChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  register: PropTypes.func,
  requestState: PropTypes.object,
};
Register.defaultProps = {
  requestState: {},
};

export default Register;
