import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    borderRadius: 12,
    bottom: 50,
    marginHorizontal: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    color: colors.white,
  }
});

export default styles;
