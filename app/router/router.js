import { StackNavigator } from 'react-navigation';

import I18n from '../i18n/i18n';

import LoginContainer from '../containers/LoginContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import { colors } from '../styles/Theme';

const commonNavigatorProps = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
  }
};

export const LoginStack = StackNavigator({
  MainLogin: {
    screen: LoginContainer,
    navigationOptions: {
      header: null,
      headerBackTitle: null,
    }
  },
  LoginFormContainer: {
    screen: LoginFormContainer,
    navigationOptions: {
      title: I18n.t('section.title.login'),
      ...commonNavigatorProps
    }
  },
  SignUpFormContainer: {
    screen: SignUpFormContainer,
    navigationOptions: {
      title: I18n.t('section.title.createAccount'),
      ...commonNavigatorProps
    }
  },
});
