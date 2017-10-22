import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import PropTypes from 'prop-types';

import TextRoboto from '../TextRoboto/TextRoboto';

import { colors } from '../../../styles/Theme';
import styles from './styles';

const propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  inputRef: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.any,
};

const defaultProps = {
  errorMessage: '',
  label: '',
  inputProps: {},
  inputRef: undefined,
  placeholder: '',
  style: undefined,
};

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
    const { label, placeholder, inputProps, inputRef, style, errorMessage } = this.props;
    const { isFocus } = this.state;

    const labelElement = (label) ? (
      <View style={styles.label}>
        <TextRoboto style={isFocus ? styles.labelTextFocus : styles.labelText}>
          { label }
        </TextRoboto>
      </View>
    ) : null;
    return (
      <View style={[ styles.container, style ]}>
        { labelElement }
        <TextInput
          style={[ styles.input, isFocus ? styles.inputFocus : null ]}
          placeholder={placeholder ? placeholder : ''}
          plaholderTextColor={colors.grey600}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          ref={inputRef}
          {...inputProps}
        />
        { errorMessage !== '' &&
          <View>
            <TextRoboto style={styles.errorText}>
              { errorMessage }
            </TextRoboto>
          </View>
        }
      </View>
    );
  }
}

TextInputField.propTypes = propTypes;
TextInputField.defaultProps = defaultProps;

export default TextInputField;
