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
});

export default styles;
