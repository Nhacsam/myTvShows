import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Page, TvShowScreen } from 'mySeries/src/components';

const styles = StyleSheet.create({
});

class TVShow extends Component {
  render() {
    return (
      <Page noMargin>
        <TvShowScreen tvShow={this.props.tvShow} />
      </Page>
    );
  }
}

TVShow.propTypes = {
  tvShow: PropTypes.object.isRequired,
};

export default TVShow;
