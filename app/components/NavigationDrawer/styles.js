import { StyleSheet } from 'react-native';

import { colors } from '../../styles/Theme';

const styles = StyleSheet.create({
  profileDataContainer: {
    alignItems: 'center'
  },
  profilePicture: {
    borderRadius: 60,
    height: 120,
    marginVertical: 16,
    width: 120,
  },
  displayName: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  email: {
    color: colors.white,
    fontSize: 14,
    paddingBottom: 16,
  },
});

export default styles;
