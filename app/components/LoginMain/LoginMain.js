import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import I18n from '../../i18n/i18n';

import TextRoboto from '../Common/TextRoboto/TextRoboto';
import Button from '../Common/Button/Button';

import styles from './LoginMainStyles';

class LoginMain extends Component {

  render() {
    const {
      onSingInPress,
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
            source={require('../../assets/images/logo.png')}
          />
        </View>

        <View style={styles.buttonsContainer}>

          <View style={styles.textDividerContainer}>
            <View
              style={styles.divider}
            />
            <Text style={styles.loginText}>
              <TextRoboto>
                {I18n.t('login.loginWith')}
              </TextRoboto>
            </Text>
            <View
              style={styles.divider}
            />
          </View>

          <Button
            style={{ backgroundColor: '#fff' }}
            icon={require('../../assets/images/google_icon.png')}
          >
            Google
          </Button>

          <Button
            style={{ backgroundColor: '#3b5998' }}
            icon={require('../../assets/images/facebook_icon.png')}
          >

            <Text style={{ color: '#fff' }}>
              FACEBOOK
            </Text>

          </Button>

          <View style={styles.textDividerContainer}>

            <View
              style={styles.divider}
            />

            <Text style={styles.loginText}>
              <TextRoboto>
                {I18n.t('login.loginOr')}
              </TextRoboto>
            </Text>

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
            >
              {I18n.t('forms.buttons.signUp')}
            </Button>

          </View>

        </View>

      </LinearGradient>
    );
  }
}

export default LoginMain;
