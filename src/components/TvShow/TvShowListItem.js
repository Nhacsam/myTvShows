import React, { PropTypes, Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback, LayoutAnimation, Dimensions } from 'react-native';
import appStyle from 'mySeries/src/appStyle';
import * as Animatable from 'react-native-animatable';

import Title from './Title';
import TvShowImage from './Image';
import NextEpisode from './NextEpisode';

const height = Dimensions.get('window').height - appStyle.navbar.height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'stretch',
    height: 250,
    justifyContent: 'center',
  },
  containerOpened: {
    height,
    width: Dimensions.get('window').width,
    position: 'relative',
    zIndex: 1,
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
  description: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  descriptionTransition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  descriptionText: {
    color: appStyle.colors.lightText,
    textAlign: 'center',
    maxHeight: height / 3,
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

class TvShowListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openend: false,
      exitEnded: true
    };

    this.onPress = this.onPress.bind(this);
  }

  componentWillUpdate() {
    const animation = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity');
    LayoutAnimation.configureNext(animation, () => {
      this.setState({
        exitEnded: true,
      });
    });
  }

  onPress() {
    this.props.onPress();

    if (this.state.opened) {
      this.refs.nextEpisode.fadeOutLeft();
      this.refs.description.fadeOutDownBig();
      return  this.setState({opened: false, windowPos: null, exitEnded: false});
    }
    this.setState({
      opened: true,
    });
    this.refs.container.measureInWindow((x, y) => this.setState({
      windowPos: { x, y },
    }));
  };


  render() {
    const props = this.props;
    const { opened, exitEnded } = this.state;

    const titleStyle = opened ? {} : [
      styles.touchable,
      (props.index % 2 === 0) ? {left: 5} : {right: 5}
    ];

    const containerPos = this.state.windowPos ? {
      top: - this.state.windowPos.y + appStyle.navbar.height,
    } : {};

    const containerStyle = [styles.container, this.state.opened && styles.containerOpened, containerPos];

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={containerStyle} ref="container" >
          <TvShowImage tvShow={props.tvShow} style={ opened ? {flex: 1} : styles.image} noShadow={opened}/>
          <View style={opened ? styles.squareSection : titleStyle}>
            <Title
              tvShow={props.tvShow}
              color={colors[(props.index % colors.length)]}
              onPress={this.onPress}
              noShadow={opened}
              />
            { (opened || ! exitEnded) && (
              <Animatable.View
                animation="slideInLeft"
                style={{flex: 1, zIndex: 1, position: opened ? undefined : 'absolute', right: 0, bottom: 0, top: 0}}
                duration={800}
                ref="nextEpisode"
              >
                <NextEpisode tvShow={this.props.tvShow}/>
              </Animatable.View>
            )}
          </View>
          { (opened || ! exitEnded) && (
            <Animatable.View
              animation="fadeInUpBig"
              style={[styles.description, !opened && styles.descriptionTransition ]}
              duration={800}
              ref="description"
              delay={400}
            >
              <Text style={styles.descriptionText} >{this.props.tvShow.overview}</Text>
            </Animatable.View>
          )}
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
  onPress: () => {}
};

export default TvShowListItem;

