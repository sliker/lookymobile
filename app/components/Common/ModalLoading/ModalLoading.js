import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { colors } from '../../../styles/Theme';
import styles from './styles';

class ModalLoading extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={true}
      >
        <View style={styles.container}>
          <ActivityIndicator
            color={colors.primary}
            size="large"
          />
        </View>
      </Modal>
    );
  }
}

export default ModalLoading;
