import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    height: 250,
    justifyContent: 'center',
  },
  square: {
    position: 'absolute',
    top: 25,
    zIndex: 2,

    height: 200,
    width: 200,
    opacity: 0.95,

    shadowColor: 'black',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: .14,
    shadowRadius: 10,

    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: appStyle.colors.lightText,
    fontSize: appStyle.font.fontSize.huge,
  },
  image: {
    height: 170,
    zIndex: 1,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: .30,
    shadowRadius: 10,
    marginLeft: 15,
    marginRight: 5,
  }
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
  <View style={styles.container}>
    <View style={[
      styles.square,
      { backgroundColor: colors[(props.index % colors.length)]},
      (props.index % 2 === 0) ? { left: 5 } : { right: 5 }
    ]}>
      <Text style={styles.text}>
        {props.tvShow.name}
      </Text>
    </View>


    <View style={styles.shadow}>
      <Image source={{uri: `https://image.tmdb.org/t/p/w500/${props.tvShow.backdrop_path}`}}
             style={styles.image}
      />
    </View>
  </View>
);

TvShowListItem.propTypes = {
  tvShow: PropTypes.object.isRequired,
  index: PropTypes.integer,
};

TvShowListItem.defaultProps = {
  index: 0,
};

export default TvShowListItem;

