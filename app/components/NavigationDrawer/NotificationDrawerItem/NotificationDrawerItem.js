import React, { PureComponent } from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import TextRoboto from '../../Common/TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  icon: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

class NotificationDrawerItem extends PureComponent {
  render() {
    const { icon, title } = this.props;

    return (
      <TouchableOpacity style={styles.container}>
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
