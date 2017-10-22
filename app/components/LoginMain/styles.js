import { StyleSheet } from 'react-native';

import { colors, layout } from '../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    padding: layout.padding,
  },
  logo: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
  },
  logoContainer: {
    marginTop: 50,
  },
  buttonsContainer: {
    bottom: layout.padding,
    left: layout.padding,
    position: 'absolute',
    right: layout.padding,
  },
  textDividerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  loginText: {
    backgroundColor: 'transparent',
    color: colors.white,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  divider: {
    alignSelf: 'center',
    backgroundColor: colors.grey600,
    flex: 1,
    height: 1,
  },
});

export default styles;
