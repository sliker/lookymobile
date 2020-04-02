import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  style: PropTypes.any,
};

const defaultProps = {
  style: undefined,
};

class VerticalDivider extends Component {
  render() {
    return (
      <View
        style={[ styles.verticalDivider, this.props.style ]}
      />
    );
  }
}

VerticalDivider.propTypes = propTypes;
VerticalDivider.defaultProps = defaultProps;

export default VerticalDivider;
