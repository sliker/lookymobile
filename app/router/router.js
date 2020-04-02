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
import SettingsContainer from '../containers/SettingsContainer';
import PetDetailContainer from '../containers/PetDetailContainer';
import { looky } from '../utils/constants';
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
      tabBarLabel: I18n.t('tabs.main.lost'),
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={{ tintColor: tintColor}}
          source={require('../../assets/images/icons/ic_warning.png')}
        />
      )
    },
  },
  FoundPets: {
    screen: FoundPetsContainer,
    navigationOptions: {
      tabBarLabel: I18n.t('tabs.main.found'),
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={{ tintColor: tintColor}}
          source={require('../../assets/images/icons/ic_search.png')}
        />
      )
    },
  },
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.primary,
  },
});

const MainPetsStack = StackNavigator({
  MainPets: {
    screen: MainPetsTabsStack,
    navigationOptions: ({ navigation }) => ({
      title: looky,
      headerBackTitle: null,
      headerLeft: drawerButton(navigation),
      ...commonNavigatorProps,
    }),
  },
  Settings: {
    screen: SettingsContainer,
    navigationOptions: {
      title: I18n.t('navigation.drawer.settings'),
      ...commonNavigatorProps,
    },
  },
  PetDetail: {
    screen: PetDetailContainer,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.petName,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }
    })
  },
});

export const MainStack = DrawerNavigator({
  MainPetList: {
    screen: MainPetsStack,
  },
}, {
  contentComponent: NavigationDrawerContentContainer,
});
