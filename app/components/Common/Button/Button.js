import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import TextRoboto from '../TextRoboto/TextRoboto';
import styles from './ButtonStyles';

class Button extends Component {
  render() {
    const { icon, children, style, onPressButton, type } = this.props;
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
      >
        { iconElement }
        <Text style={styles.text}>
          <TextRoboto>
            { (typeof children === 'string') ? children.toUpperCase() : children }
          </TextRoboto>
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
