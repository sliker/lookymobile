import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/Theme';

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    tintColor: colors.white,
    marginBottom: 2,
  },
  text: {
    color: colors.white,
  },
});

export default styles;
