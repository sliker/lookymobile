import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  numberOfLines: PropTypes.number,
  style: PropTypes.any,
};

const defaultProps = {
  numberOfLines: 0,
  style: undefined,
};

class TextRoboto extends Component {
  render() {
    return (
      <Text
        style={[ styles.roboto, this.props.style ]}
        numberOfLines={this.props.numberOfLines}
        ellipsizeMode={'tail'}
      >
        {this.props.children}
      </Text>
    );
  }
}

TextRoboto.propTypes = propTypes;
TextRoboto.defaultProps = defaultProps;

export default TextRoboto;
