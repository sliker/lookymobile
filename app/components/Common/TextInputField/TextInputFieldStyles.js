import { StyleSheet } from 'react-native';

import Color from '../../../themes/Color';

const styles = StyleSheet.create({
  label: {
    paddingBottom: 8,
    paddingTop: 16,
  },
  labelText: {
    color: Color.textPrimaryDark,
  },
  labelTextFocus: {
    color: Color.primary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Color.textPrimaryDark,
    color: Color.textPrimaryDark,
    paddingVertical: 8,
    marginBottom: 8,
  },
  inputFocus: {
    borderColor: Color.primary,
    borderBottomWidth: 2,
  }
});

export default styles;
