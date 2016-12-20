import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './modules/store';
import Scenes from './Scenes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
    };
  }

  componentDidMount() {
    createStore((store) => this.setState({ store }));
  }

  render() {
    return this.state.store ? (
      <Provider store={this.state.store}>
        <Scenes />
      </Provider>
    ) : null;
  }
}

export default App;
