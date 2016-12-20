import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: appStyle.dimensions.touchableHeight,
    marginVertical: appStyle.margins.inner,
    minWidth: appStyle.dimensions.minButtonWidth*1.5,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 45,
    paddingHorizontal: appStyle.margins.inner,

    backgroundColor: 'transparent',
    borderColor: appStyle.colors.lightText,
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    textAlign: 'center',
    color: appStyle.colors.lightText,
    fontSize: appStyle.font.fontSize.big,
  },
});

const Button = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <View style={styles.button}>
      <Text style={[styles.text]}>{props.children.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  buttonType: PropTypes.string,
};

export default Button;
