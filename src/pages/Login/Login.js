import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton, Page } from 'mySeries/src/components';
import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'AlfaSlabOne-Regular',
    color: appStyle.colors.lightText,
  },
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputOpen: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require('../../assets/login-bg.jpg')}>
          <Page noNavBar backgroundColor="transparent">
            { (! this.state.inputOpen) ? (
              <View style={styles.content}>
                <Text style={styles.logo}>
                  My Series
                </Text>
                <LoginButton onPress={() => this.setState({inputOpen: true})}>
                  Login
                </LoginButton>
              </View>
            ) : (
              <View style={styles.fieldsContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={this.props.onUsernameChange}
                  placeholderTextColor={appStyle.colors.lightPlaceholder}
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={() => this.refs.password.focus()}
                />
                <TextInput
                  ref='password'
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={this.props.onPasswordChange}
                  placeholderTextColor={appStyle.colors.lightPlaceholder}
                  onSubmitEditing={this.props.sendLogin}
                  returnKeyType="send"
                />
                <LoginButton onPress={this.props.sendLogin}>Send</LoginButton>
              </View>
            )}
          </Page>
        </Image>
      </View>
    );
  }
}

Login.propTypes = {
  onUsernameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  sendLogin: PropTypes.func,
};

export default Login;
