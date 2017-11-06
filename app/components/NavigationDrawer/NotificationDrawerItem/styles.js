import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.blueGrey800,
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    marginLeft: 16,
  }
});

export default styles;
