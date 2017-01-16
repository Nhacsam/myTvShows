import React, { Component, PropTypes } from 'react';
import { StyleSheet, ListView, ActivityIndicator, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

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
    this.state = { dataSource: ds, active: false, currentId: null };
    this.listItems = {};
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

  toggleActive(rowID) {

    if (this.state.active) {
      this.animate(false, this.state.currentId);
      return this.setState({ active: false });
    }

    this.setState({ currentId: rowID, active: true });
    this.animate(true, rowID);
  }

  animate(out, currentId) {
    for (let rowId in this.listItems) {
      if (rowId === currentId) {
        continue;
      }
      const item = this.listItems[rowId];

      if (out) {
        item.fadeOutUp(400);
      } else {
        item.fadeInUp(400);
      }
    }

  }

  render() {
    const { active } = this.state;

    return (
      <Page noMargin={active}>
        {this.props.isFetching && ! this.props.tvShows.length && <ActivityIndicator />}
        <ListView
          ref="list"
          dataSource={this.state.dataSource}
          scrollEnabled={!active}
          renderRow={(tvShow, sectionID, rowID) => (
            <Animatable.View ref={(ref) => {this.listItems[rowID] = ref;}} style={{ flex: 1 }} >
              <TvShowListItem tvShow={tvShow} index={rowID} onPress={() => this.toggleActive(rowID)} />
            </Animatable.View>
          )}
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
