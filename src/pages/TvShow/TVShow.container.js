import { connect } from 'react-redux';
import { find } from 'mySeries/src/modules/TVshows';
import TvShow from './TVShow';

const mapStateToProps = (state) => ({
  tvShow: state.tvShows.current,
});

const mapDispatchToProps = (dispatch) => ({
});

const TVShowContainer = connect(mapStateToProps, mapDispatchToProps)(TvShow);

export default TVShowContainer;

