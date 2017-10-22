import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

import TextRoboto from '../TextRoboto/TextRoboto';
import styles from './styles';

const propTypes = {
  icon: PropTypes.any,
  loading: PropTypes.bool,
  onPressButton: PropTypes.func.isRequired,
  style: PropTypes.any,
  type: PropTypes.string,
};

const defaultProps = {
  icon: undefined,
  loading: false,
  style: undefined,
  type: 'button',
};

class Button extends Component {
  render() {
    const { icon, children, style, onPressButton, type, loading } = this.props;
    const iconElement = (icon) ? (
      <Image
        style={styles.icon}
        source={icon}
      />
    ) : null;

    const buttonStyle = (() => {
      switch (type) {
        case 'flat':
          return styles.flat;
        case 'button':
        default:
          return styles.button
      }
    })();

    return (
      <TouchableOpacity
        style={[ buttonStyle, style ]}
        onPress={onPressButton}
        disabled={loading}
      >
        { iconElement }
        {loading &&
          <ActivityIndicator style={styles.loading} />
        }
        {!loading &&
          <Text style={styles.text}>
            <TextRoboto>
              { (typeof children === 'string') ? children.toUpperCase() : children }
            </TextRoboto>
          </Text>
        }
      </TouchableOpacity>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
