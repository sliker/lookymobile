import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../../i18n/i18n';

import TextRoboto from '../TextRoboto/TextRoboto';
import Button from '../Button/Button';

import styles from './styles';

const propTypes = {
  onDismiss: PropTypes.func,
  onPositivePress: PropTypes.func.isRequired,
  title: PropTypes.string,
  positiveText: PropTypes.string,
};

const defaultProps = {
  onDismiss: undefined,
  title: undefined,
  positiveText: 'Ok',
};

class AlertDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    const { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss();
    }

    this.setModalVisible(false);
  }

  show() {
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { children, title, positiveText, onPositivePress } = this.props;
    const { modalVisible } = this.state;
    return (
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={this.dismiss}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.content}>

              {title &&
                <TextRoboto style={styles.title}>
                  {title}
                </TextRoboto>
              }

              {children}

            </View>

            <View style={styles.buttons}>

              <Button
                style={styles.button}
                type="flat"
                onPressButton={this.dismiss}
              >
                <Text style={styles.buttonsText}>
                  { I18n.t('buttons.cancel').toUpperCase() }
                </Text>
              </Button>

              <Button
                style={styles.button}
                type="flat"
                onPressButton={onPositivePress}
              >
                <Text style={styles.buttonsText}>
                  { positiveText.toUpperCase() }
                </Text>
              </Button>

            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

AlertDialog.propTypes = propTypes;
AlertDialog.defaultProps = defaultProps;

export default AlertDialog;
