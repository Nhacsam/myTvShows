import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginButton } from 'mySeries/src/components';
import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
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
});

const Splash = () => (
  <View style={styles.content}>
    <Text style={styles.logo}>
      My Series
    </Text>
    <View>
      <LoginButton onPress={Actions.login}>
        Login
      </LoginButton>
      <LoginButton onPress={Actions.register}>
        Register
      </LoginButton>
    </View>
  </View>
);


export default Splash;
