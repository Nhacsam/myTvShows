import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import appStyle from 'mySeries/src/appStyle';

import Title from './Title';
import TvShowImage from './Image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    height: 250,
    justifyContent: 'center',
  },
  touchable: {
    position: 'absolute',
    top: 25,

    zIndex: 2,
    height: 200,
    width: 200,
  },
  image: {
    flex: 0,
    height: 170,
    zIndex: 1,
  },
});

const colors = [
  '#7e57c2',
  '#03a9f4',
  '#f44336',
  '#009688',
  '#e91e63',
  '#4caf50',
  '#ff9800',
  '#795548',
  '#607d8b',
  '#9c27b0',
  '#00bcd4',
  '#ffc107',
];

const TvShowListItem = props => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View style={styles.container}>
      <Title
        tvShow={props.tvShow}
        style={[
          styles.touchable,
          (props.index % 2 === 0) ? { left: 5 } : { right: 5 }
        ]}
        color={colors[(props.index % colors.length)]}
        onPress={props.onPress}
      />
      <TvShowImage tvShow={props.tvShow} style={styles.image} />
    </View>
  </TouchableWithoutFeedback>
);

TvShowListItem.propTypes = {
  tvShow: PropTypes.object.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onPress: PropTypes.func,
};

TvShowListItem.defaultProps = {
  index: 0,
};

export default TvShowListItem;
