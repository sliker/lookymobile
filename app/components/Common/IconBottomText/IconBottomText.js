import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import TextRoboto from '../TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  title: PropTypes.string,
  iconSrc: PropTypes.number.isRequired,
};

const defaultProps = {
  title: '',
};

class IconBottomText extends Component {
  render() {
    const { title, iconSrc } = this.props;
    return (
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={iconSrc}
        />
        <TextRoboto style={styles.text}>
          { title }
        </TextRoboto>
      </View>
    );
  }
}

IconBottomText.propTypes = propTypes;
IconBottomText.defaultProps = defaultProps;

export default IconBottomText;
