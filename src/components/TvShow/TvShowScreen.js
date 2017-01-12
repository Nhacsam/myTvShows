import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TvShowListItem from './TvShowListItem';

import Title from './Title';
import TvShowImage from './Image';
import NextEpisode from './NextEpisode';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    flex: 1,
  },
  squareSection: {
    height: Dimensions.get('window').width / 2,
    flexDirection: 'row',
  },
});

class TvShowScreen extends Component {
  render() {

    return <TvShowListItem tvShow={this.props.tvShow} opened />;

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <TvShowImage tvShow={this.props.tvShow} noShadow />
        </View>
        <View style={styles.squareSection}>
          <Title tvShow={this.props.tvShow} noShadow />
          <NextEpisode tvShow={this.props.tvShow} />
        </View>
        <View style={styles.section} />
      </View>
    );
  }
}

TvShowScreen.propTypes = {
  tvShow: PropTypes.object.isRequired,
};

export default TvShowScreen;
