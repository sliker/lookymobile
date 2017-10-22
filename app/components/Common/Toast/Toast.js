import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import TextRoboto from '../TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  duration: PropTypes.number,
};

const defaultProps = {
  duration: 5000,
};

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      message: '',
    };

    this.hideTimer = null;
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimer);
  }

  show(message) {
    clearTimeout(this.hideTimer);
    this.setState({
      show: true,
      message,
    }, () => {
      this.hideTimer = setTimeout(() => {
        this.setState({
          show: false,
          message: '',
        })
      }, this.props.duration);
    });
  }

  render() {
    const { show, message } = this.state;
    return show ? (
      <View style={styles.container}>
        <TextRoboto style={styles.text}>
          { message }
        </TextRoboto>
      </View>
    ) : null;
  }
}

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

export default Toast;
