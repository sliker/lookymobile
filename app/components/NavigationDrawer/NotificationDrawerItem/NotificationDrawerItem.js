import React, { PureComponent } from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import TextRoboto from '../../Common/TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
  }).isRequired,
  onNavigateToScreen: PropTypes.func.isRequired,
};

class NotificationDrawerItem extends PureComponent {
  render() {
    const { item: { icon, title, screen }, onNavigateToScreen } = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          onNavigateToScreen(screen);
        }}
      >
        <Image
          source={icon}
        />
        <TextRoboto style={styles.text}>
          { title }
        </TextRoboto>
      </TouchableOpacity>
    );
  }
}

NotificationDrawerItem.propTypes = propTypes;

export default NotificationDrawerItem;
