import { StyleSheet } from 'react-native';

import colors from '../../themes/Color';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    padding: 16,
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
    bottom: 16,
    left: 16,
    position: 'absolute',
    right: 16,
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
