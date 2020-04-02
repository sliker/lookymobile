import { StyleSheet } from 'react-native';

import { colors, layout } from '../styles/Theme';

const styles = StyleSheet.create({
  signUpFormContainer: {
    backgroundColor: colors.white,
    flex: 1,
    padding: layout.padding,
  },
  navigationDrawer: {
    backgroundColor: colors.blueGrey900,
    flex: 1,
    paddingTop: 22,
  },
  listView: {
    backgroundColor: colors.white,
    marginBottom: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    shadowOpacity: .2,
    shadowRadius: 0,
  },
});

export default styles;
