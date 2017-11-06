import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation';

import I18n from '../i18n/i18n';

import LoginContainer from '../containers/LoginContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import NavigationDrawerContentContainer from '../containers/NavigationDrawerContentContainer';
import LostPetsContainer from '../containers/LostPetsContainer';
import FoundPetsContainer from '../containers/FoundPetsContainer';
import { colors } from '../styles/Theme';

const commonNavigatorProps = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
  }
};

const drawerButton = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DrawerOpen');
      }}
    >
      <Image
        source={require('../../assets/images/icons/ic_menu_white.png')}
        style={{ marginLeft: 5 }}
      />
    </TouchableOpacity>
  );
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

const MainPetsTabsStack = TabNavigator({
  LostPets: {
    screen: LostPetsContainer,
    navigationOptions: {
      tabBarLabel: 'Lost',
    },
  },
  FoundPets: {
    screen: FoundPetsContainer,
    navigationOptions: {
      tabBarLabel: 'Found',
    },
  },
});

const MainPetsStack = StackNavigator({
  MainPets: {
    screen: MainPetsTabsStack,
  }
}, {
  navigationOptions: ({ navigation }) => ({
    title: 'Looky',
    headerLeft: drawerButton(navigation),
    ...commonNavigatorProps,
  }),
});

export const MainStack = DrawerNavigator({
  MainPetList: {
    screen: MainPetsStack,
  },
}, {
  contentComponent: NavigationDrawerContentContainer,
});
