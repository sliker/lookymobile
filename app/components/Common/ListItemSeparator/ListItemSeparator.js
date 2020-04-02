import React, { PureComponent } from 'react';
import {
  View,
} from 'react-native';

import styles from './styles';

class ListItemSeparator extends PureComponent {
  render() {
    return (
      <View
        style={styles.separator}
      />
    );
  }
}

export default ListItemSeparator;
