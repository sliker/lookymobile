import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import TextRoboto from '../TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

class ListItem extends PureComponent {
  render() {
    const { item, onPress } = this.props;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPress(item.key)}
      >
        <TextRoboto>{item.title}</TextRoboto>
      </TouchableOpacity>
    );
  }
}

ListItem.propTypes = propTypes;

export default ListItem;
