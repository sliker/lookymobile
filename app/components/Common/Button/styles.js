import { StyleSheet } from 'react-native';

import { colors, layout } from '../../../styles/Theme';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.grey300,
    borderRadius: 2,
    flexDirection: 'row',
    height: 36,
    marginVertical: 5,
    paddingHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowOpacity: .2,
    shadowRadius: 1,
  },
  flat: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 36,
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.textPrimaryDark,
    flex: 1,
    fontSize: 14,
    fontWeight:  '600',
    textAlign: 'center',
  },
  icon: {
    height: 25,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
    width: 35
  },
  loading: {
    flex: 1,
  },
});

export default styles;
