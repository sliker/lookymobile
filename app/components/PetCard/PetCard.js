import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Record } from 'immutable';
import Moment from 'moment';

import styles from './styles';
import TextRoboto from '../Common/TextRoboto/TextRoboto';
import PetCardUserInfo from '../PetCardUserInfo/PetCardUserInfo';

const propTypes = {
  pet: PropTypes.object.isRequired,
  userProfile: PropTypes.instanceOf(Record).isRequired,
};

class PetCard extends Component {
  render() {
    const { userProfile, pet, onPress } = this.props;
    const petName = pet.get('petType') === 0 ? pet.get('petName') : pet.get('petBreed');
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress(pet.get('key'), petName)}
      >

        <PetCardUserInfo
          displayName={userProfile.get('displayName')}
          publishDate={pet.get('publishDate')}
          profilePicture={userProfile.get('profilePictureUrl')}
        />

        <Image
          style={styles.petImage}
          source={{uri: pet.get('petPictureUrl')}}
        />

        <View style={styles.cardFooter}>

          <View style={styles.petDate}>
            <TextRoboto style={styles.petDateDay}>
              { Moment(pet.get('petDate')).format('DD') }
            </TextRoboto>
            <TextRoboto style={styles.petDateMonth}>
              { Moment(pet.get('petDate')).format('MMM').toLowerCase() }
            </TextRoboto>
          </View>

          <View style={{ paddingHorizontal: 8, flex: 1 }}>
            <TextRoboto numberOfLines={1} style={styles.petName}>
              { petName }
            </TextRoboto>
            <TextRoboto numberOfLines={1} style={styles.petAddress}>
              { `${pet.get('petAddress')} / ${pet.get('petNeighborhood')}, ${pet.get('petCity')}` }
            </TextRoboto>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: 'auto', justifyContent: 'flex-end', width: 50 }}>
            <View
              style={styles.verticalDivider}
            />

            <TouchableOpacity style={{ paddingHorizontal: 8, }}>
              <Image
                source={require('../../../assets/images/icons/ic_share.png')}
              />
            </TouchableOpacity>
          </View>

        </View>

      </TouchableOpacity>
    );
  }
}

PetCard.propTypes = propTypes;

export default PetCard;
