import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';

import I18n from '../../i18n/i18n';

import TextRoboto from '../Common/TextRoboto/TextRoboto';
import Button from '../Common/Button/Button';

import styles from './styles';

const propTypes = {
  onSingInPress: PropTypes.func.isRequired,
  onSignUpPress: PropTypes.func.isRequired,
  onSocialSignIn: PropTypes.func.isRequired,
};

class LoginMain extends Component {

  render() {
    const {
      onSingInPress,
      onSignUpPress,
      onSocialSignIn,
    } = this.props;

    return (
      <LinearGradient
        colors={['#111F21', '#2F4247']}
        style={styles.container}
      >

        <StatusBar
          barStyle="light-content"
        />

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/logo.png')}
          />
        </View>

        <View style={styles.buttonsContainer}>

          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                console.log(result.grantedPermissions.toString());
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }}
            onLogoutFinished={() => alert("logout.")}
          />

          <View style={styles.textDividerContainer}>
            <View
              style={styles.divider}
            />
            <TextRoboto style={styles.loginText}>
              {I18n.t('login.loginWith')}
            </TextRoboto>
            <View
              style={styles.divider}
            />
          </View>

          <Button
            style={{ backgroundColor: '#fff' }}
            icon={require('../../../assets/images/google_icon.png')}
            onPressButton={() => {
              onSocialSignIn('google')
            }}
          >
            Google
          </Button>

          <Button
            style={{ backgroundColor: '#3b5998' }}
            icon={require('../../../assets/images/facebook_icon.png')}
            onPressButton={() => {
              onSocialSignIn('facebook')
            }}
          >

            <Text style={{ color: '#fff' }}>
              FACEBOOK
            </Text>

          </Button>

          <View style={styles.textDividerContainer}>

            <View
              style={styles.divider}
            />

            <TextRoboto style={styles.loginText}>
              {I18n.t('login.loginOr')}
            </TextRoboto>

            <View
              style={styles.divider}
            />

          </View>

          <View style={{ flexDirection: 'row', flex: 1 }}>

            <Button
              style={{ flex: 1, marginRight: 5 }}
              onPressButton={onSingInPress}
            >
              {I18n.t('forms.buttons.signIn')}
            </Button>

            <Button
              style={{ flex: 1, marginLeft: 5 }}
              onPressButton={onSignUpPress}
            >
              {I18n.t('forms.buttons.signUp')}
            </Button>

          </View>

        </View>

      </LinearGradient>
    );
  }
}

LoginMain.propTypes = propTypes;

export default LoginMain;
