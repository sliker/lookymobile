import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/Theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.alertDialogBg,
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: colors.white,
    borderRadius: 2,
    marginHorizontal: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: .4,
    shadowRadius: 8,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
  },
  button: {
    flex: 1,
  },
  buttonsText: {
    color: colors.accent,
  },
});

export default styles;
