import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Moment from 'moment';
import I18n from '../../i18n/i18n';

import TextRoboto from '../Common/TextRoboto/TextRoboto';

import styles from './styles';

const propTypes = {
  displayName: PropTypes.string.isRequired,
  publishDate: PropTypes.number.isRequired,
  profilePicture: PropTypes.string,
};

const defaultProps = {
  profilePicture: '',
};

class PetCardUserInfo extends Component {
  render() {
    const { displayName, publishDate, profilePicture } = this.props;
    const userProfilePicture = profilePicture ?
      {uri: profilePicture} : require('../../../assets/images/default_profile_picture.png');
    return (
      <View style={styles.userInfoHeader}>
        <Image
          style={styles.userImage}
          source={userProfilePicture}
        />
        <TextRoboto style={styles.userInfoName} numberOfLines={1}>
          { displayName }
        </TextRoboto>
        <TextRoboto style={styles.publishDate} numberOfLines={1}>
          { I18n.t('global.published') } { Moment(publishDate).fromNow() }
        </TextRoboto>
      </View>
    );
  }
}

PetCardUserInfo.propTypes = propTypes;
PetCardUserInfo.defaultProps = defaultProps;

export default PetCardUserInfo;
