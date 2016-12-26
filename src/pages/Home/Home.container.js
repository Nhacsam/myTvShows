import { connect } from 'react-redux';
import { find } from 'mySeries/src/modules/TVshows';
import Home from './Home';

const mapStateToProps = (state) => ({
  tvShows: state.tvShows.list,
  isFetching: state.tvShows._metadata.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  getTvShows: () => dispatch(find()),
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;

