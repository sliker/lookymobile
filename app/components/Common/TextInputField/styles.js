import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    height: 88,
    marginBottom: 12,
  },
  label: {
    paddingTop: 16,
  },
  labelText: {
    color: colors.textPrimaryDark,
  },
  labelTextFocus: {
    color: colors.primary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.textPrimaryDark,
    color: colors.textPrimaryDark,
    paddingVertical: 8,
    marginBottom: 8,
  },
  inputFocus: {
    borderColor: colors.primary,
    borderBottomWidth: 2,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  }
});

export default styles;
