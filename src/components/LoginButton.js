import React, { PropTypes, Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import appStyle from 'mySeries/src/appStyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: appStyle.dimensions.touchableHeight * 1.3,
    marginVertical: appStyle.margins.inner,
    overflow: 'hidden',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: appStyle.dimensions.largeButtonHeight,

    backgroundColor: appStyle.colors.lightText,
    borderRadius: 30,
  },
  buttonFetching: {
    width: appStyle.dimensions.largeButtonHeight,

  },
  buttonError: {
    backgroundColor: '#f44336',
    width: appStyle.dimensions.largeButtonHeight,
  },
  buttonSuccess: {
    backgroundColor: '#4caf50',
    width: appStyle.dimensions.largeButtonHeight,
  },
  buttonIdle: {
    height: appStyle.dimensions.touchableHeight,
    paddingHorizontal: appStyle.margins.inner,
    minWidth: appStyle.dimensions.largeButtonWidth,
  },
  text: {
    textAlign: 'center',
    color: '#1a237e',
    fontSize: appStyle.font.fontSize.big,
  },
  textWhite: {
    textAlign: 'center',
    color: appStyle.colors.lightText,
  }
});

class Button extends Component {

  status = {
    IDLE: 'idle',
    ERROR: 'error',
    SUCCESS: 'success',
    FETCHING: 'fetching',
  };

  constructor() {
    super();
    this.state = {
      status: this.status.IDLE,
    };
  }

  componentWillReceiveProps(nextProps) {

    let nextStatus = this.status.IDLE;
    if (nextProps.isFetching) {
      nextStatus = this.status.FETCHING;
    }
    if (nextProps.isError) {
      nextStatus = this.status.ERROR;
    }
    if (nextProps.isSuccess) {
      nextStatus = this.status.SUCCESS;
    }

    this.setState({status: nextStatus});

    setTimeout(() => {
      if (nextStatus === this.status.FETCHING || this.state.status !== nextStatus) {
        return;
      }
      this.setState({status: this.status.IDLE});
    }, 2000);

  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  getContent() {
    switch(this.state.status) {
      case this.status.FETCHING:
        return (
          <ActivityIndicator />
        );

      case this.status.ERROR:
        return (
          <Text style={[styles.text, styles.textWhite]}>!</Text>
        );

      case this.status.SUCCESS:
        return <Icon style={styles.textWhite} name="done" size={appStyle.font.fontSize.huge}/>;

      default:
        return (
          <Text style={styles.text}>{this.props.children.toUpperCase()}</Text>
        );
    }
  }

  getButtonStyle() {
    switch(this.state.status) {
      case this.status.FETCHING:
        return styles.buttonFetching
      case this.status.ERROR:
        return styles.buttonError;
      case this.status.SUCCESS:
        return styles.buttonSuccess
      default:
        return styles.buttonIdle;
    }
  }

  render() {
    const props = this.props;
    const buttonStyle = this.getButtonStyle();

    return (
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <View style={[styles.button, buttonStyle]}>
          { this.getContent()}
        </View>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  buttonType: PropTypes.string,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

export default Button;
