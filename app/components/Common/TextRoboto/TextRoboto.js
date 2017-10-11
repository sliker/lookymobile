import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import styles from './TextRobotoStyles';

class TextRoboto extends Component {
  render() {
    return (
      <Text style={[ styles.roboto, this.props.style ]}>
        {this.props.children}
      </Text>
    );
  }
}

export default TextRoboto;
