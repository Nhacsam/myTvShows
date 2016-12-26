import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Page, TvShowListItem } from 'mySeries/src/components';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#90a4ae',
    flex: 1,
    justifyContent: 'center',
  },
});

class Home extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id}
    );
    this.state = { dataSource: ds };
  }

  componentWillMount() {
    if (this.props.getTvShows) {
      this.props.getTvShows();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.tvShows)
    });
  }

  render() {
    return (
      <Page>
        {this.props.isFetching && ! this.props.tvShows.length && <ActivityIndicator />}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(tvShow, sectionID, rowID) => <TvShowListItem tvShow={tvShow} index={rowID} />}
          enableEmptySections
          />
      </Page>
    );
  }
}

Home.propTypes = {
  tvShows: PropTypes.array.isRequired,
  getTvShows: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default Home;
