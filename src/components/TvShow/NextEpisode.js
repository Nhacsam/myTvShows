import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  square: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: appStyle.colors.primary,
    fontSize: appStyle.font.fontSize.huge,
    maxWidth: 140,
  },
});

const NextEpisode = props => (
  <TouchableHighlight onPress={props.onPress} underlayColor="white" style={[
    styles.touchable,
    props.style,
  ]}>
    <View style={[styles.square, { backgroundColor: props.color}]}>
      <Text style={styles.text}>
        {props.tvShow.vote_average}
      </Text>
    </View>
  </TouchableHighlight>
);

NextEpisode.propTypes = {
  tvShow: PropTypes.object.isRequired,
  style: PropTypes.any,
  color: PropTypes.string,
};

NextEpisode.defaultProps = {
  color: 'white',
};

export default NextEpisode;

