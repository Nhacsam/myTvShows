import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Page } from 'mySeries/src/components';
import { DefaultRenderer } from 'react-native-router-flux';

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
});

const LoginBackground = (props) => {
  const state = props.children[props.children.length - 1];
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../assets/login-bg.jpg')}>
        <Page noNavBar backgroundColor="transparent">
          <DefaultRenderer navigationState={state} key={state.key} {...state} onNavigate={props.onNavigate} />
        </Page>
      </Image>
    </View>
  );
};


export default LoginBackground;
