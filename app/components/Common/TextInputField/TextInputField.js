import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import TextRoboto from '../TextRoboto/TextRoboto';

import Color from '../../../themes/Color';
import styles from './TextInputFieldStyles';

class TextInputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      isFocus: true,
    });
  }

  onBlur() {
    this.setState({
      isFocus: false,
    });
  }

  render() {
    const { label, placeholder, inputProps, inputRef, style } = this.props;
    const { isFocus } = this.state;

    const labelElement = (label) ? (
      <View style={styles.label}>
        <TextRoboto style={isFocus ? styles.labelTextFocus : styles.labelText}>
          { label }
        </TextRoboto>
      </View>
    ) : null;
    return (
      <View style={[ { height: 88 }, style ]}>
        { labelElement }
        <TextInput
          style={[ styles.input, isFocus ? styles.inputFocus : null ]}
          placeholder={placeholder ? placeholder : ''}
          plaholderTextColor={Color.grey600}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputRef}
          {...inputProps}
        />
      </View>
    );
  }
}

export default TextInputField;
