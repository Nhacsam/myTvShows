import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback, LayoutAnimation, Dimensions } from 'react-native';
import appStyle from 'mySeries/src/appStyle';

import Title from './Title';
import TvShowImage from './Image';
import NextEpisode from './NextEpisode';

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
  squareSection: {
    height: Dimensions.get('window').width / 2,
    flexDirection: 'row',
  },
  section: {
    flex: 1,
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

class TvShowListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openend: false,
    };
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const props = this.props;
    const { opened } = this.state;

    const titleStyle = opened ? {} : [
      styles.touchable,
      (props.index % 2 === 0) ? {left: 5} : {right: 5}
    ];

    const onPress = () => {
      this.setState({opened: true});
      // props.onPress();
    };

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <TvShowImage tvShow={props.tvShow} style={ opened ? {} : styles.image} noShadow={opened}/>
          <View style={opened ? styles.squareSection : titleStyle}>
            <Title
              tvShow={props.tvShow}
              color={colors[(props.index % colors.length)]}
              onPress={onPress}
              noShadow={opened}
              />
            { opened && <NextEpisode tvShow={this.props.tvShow}/>}
          </View>
          { opened && <View style={styles.section}/>}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TvShowListItem.propTypes = {
  tvShow: PropTypes.object.isRequired,
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onPress: PropTypes.func,
  opened: PropTypes.bool,
};

TvShowListItem.defaultProps = {
  index: 0,
};

export default TvShowListItem;

