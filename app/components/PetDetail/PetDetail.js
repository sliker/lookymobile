import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { PagerTabIndicator, IndicatorViewPager } from 'rn-viewpager';
import Moment from 'moment';
import I18n from '../../i18n/i18n';

import TextRoboto from '../Common/TextRoboto/TextRoboto';
import PetCardUserInfo from '../PetCardUserInfo/PetCardUserInfo';
import VerticalDivider from '../Common/VerticalDivider/VerticalDivider';
import IconBottomText from '../Common/IconBottomText/IconBottomText';
import {
  emptyField,
  petGenderMale,
  petGenderFemale,
  petKindDog,
  petSizeSmall,
  petSizeMedium,
  petSizeLarge,
  petAgePuppy,
  petAgeAdult,
  petAgeSenior,
  petTypeLost,
} from '../../utils/constants';

import styles from './styles';


class PetDetail extends Component {

  getGenderIcon() {
    const { pet } = this.props;
    const gender = pet.get('petGender');

    switch (gender) {
      case petGenderMale:
        return (
          <IconBottomText
            title={I18n.t('pet.gender.male')}
            iconSrc={require('../../../assets/images/icons/ic_pet_male_48dp_off.png')}
          />
        );
      case petGenderFemale:
        return (
          <IconBottomText
            title={I18n.t('pet.gender.female')}
            iconSrc={require('../../../assets/images/icons/ic_pet_female_48dp_off.png')}
          />
        );
      case emptyField:
        return null;
    }
  }

  getSizeIcon() {
    const { pet } = this.props;
    const petSize = pet.get('petSize');
    const petKind = pet.get('petKind'); // dog or cat

    if (petKind === petKindDog) {
      switch (petSize) {
        case petSizeSmall:
          return (
            <IconBottomText
              title={I18n.t('pet.size.small')}
              iconSrc={require('../../../assets/images/icons/ic_pet_size_small_48dp_off.png')}
            />
          );
        case petSizeMedium:
          return (
            <IconBottomText
              title={I18n.t('pet.size.medium')}
              iconSrc={require('../../../assets/images/icons/ic_pet_size_medium_48dp_off.png')}
            />
          );
        case petSizeLarge:
          return (
            <IconBottomText
              title={I18n.t('pet.size.large')}
              iconSrc={require('../../../assets/images/icons/ic_pet_size_large_48dp_off.png')}
            />
          );
      }
    }
  }

  getAgeIcon() {
    const { pet } = this.props;
    const petAge = pet.get('petAge');
    const petKind = pet.get('petKind'); // dog or cat
    let petIcon;
    switch (petAge) {
      case petAgePuppy:
        petIcon = petKind === petKindDog ?
          require('../../../assets/images/icons/ic_pet_dog_age_puppy_48dp_off.png') :
          require('../../../assets/images/icons/ic_pet_cat_age_puppy_48dp_off.png');
        return (
          <IconBottomText
            title={I18n.t('pet.age.puppy')}
            iconSrc={petIcon}
          />
        );
      case petAgeAdult:
        petIcon = petKind === petKindDog ?
          require('../../../assets/images/icons/ic_pet_dog_age_adult_48dp_off.png') :
          require('../../../assets/images/icons/ic_pet_cat_age_adult_48dp_off.png');
        return (
          <IconBottomText
            title={I18n.t('pet.age.adult')}
            iconSrc={petIcon}
          />
        );
      case petAgeSenior:
        petIcon = petKind === petKindDog ?
          require('../../../assets/images/icons/ic_pet_dog_age_senior_48dp_off.png') :
          require('../../../assets/images/icons/ic_pet_cat_age_senior_48dp_off.png');
        return (
          <IconBottomText
            title={I18n.t('pet.age.senior')}
            iconSrc={petIcon}
          />
        );
    }
  }

  renderTabIndicator() {
    const tabs = [
      {
        text: I18n.t('pet.details.tab.information').toUpperCase(),
      },
      {
        text: I18n.t('pet.details.tab.location').toUpperCase(),
      },
    ];
    return (
      <PagerTabIndicator
        style={styles.tabsIndicatorContainer}
        itemStyle={styles.tabItem}
        selectedItemStyle={styles.selectedTabItem}
        textStyle={styles.tabTxt}
        selectedTextStyle={styles.selectedTabTxt}
        tabs={tabs}
      />
    );
  }

  render() {
    const { pet, userProfile } = this.props;
    const type = pet.get('petType');
    const kind = pet.get('petKind');
    const breed = pet.get('petBreed');
    const description = pet.get('petDescription');
    const advices = pet.get('petAdvice');
    const chipNumber = pet.get('petChipNumber');
    const fullAddress = `${pet.get('petAddress')} / ${pet.get('petNeighborhood')}, ${pet.get('petCity')}`;
    return (
      <View style={{ flex: 1 }}>

        <Image
          style={{ width: '100%', height: 300 }}
          source={{uri: pet.get('petPictureUrl')}}
        />

        <IndicatorViewPager
          style={styles.indicatorViewPager}
          indicator={this.renderTabIndicator()}
        >
          <View style={styles.pagerItem}>

            <PetCardUserInfo
              displayName={userProfile.get('displayName')}
              publishDate={pet.get('publishDate')}
              profilePicture={userProfile.get('profilePictureUrl')}
            />

            <View style={styles.characteristicsContainer}>
              { this.getGenderIcon() }
              {kind === petKindDog &&
                <VerticalDivider style={styles.verticalDivider} />
              }
              { this.getSizeIcon() }
              <VerticalDivider style={styles.verticalDivider} />
              { this.getAgeIcon() }
            </View>

            <View style={styles.date}>
              <TextRoboto>
                { I18n.t(type === petTypeLost ? 'pet.lost.date' : 'pet.found.date')  } { Moment(pet.get('petDate')).format('DD MMMM YYYY') }
              </TextRoboto>
            </View>

            <View style={styles.generalDetailsContainer}>
              {breed !== '' &&
                <View>
                  <TextRoboto style={styles.generalDetailsLabel}>
                    { I18n.t('pet.details.breed') }
                  </TextRoboto>
                  <TextRoboto style={styles.generalDetails}>
                    { breed }
                  </TextRoboto>
                </View>
              }

              {description !== '' &&
                <View>
                  <TextRoboto style={styles.generalDetailsLabel}>
                    { I18n.t('pet.details.description') }
                  </TextRoboto>
                  <TextRoboto style={styles.generalDetails}>
                    { description }
                  </TextRoboto>
                </View>
              }

              {advices !== '' &&
                <View>
                  <TextRoboto style={styles.generalDetailsLabel}>
                    { I18n.t('pet.details.advice') }
                  </TextRoboto>
                  <TextRoboto style={styles.generalDetails}>
                    { advices }
                  </TextRoboto>
                </View>
              }

              {chipNumber !== '' &&
                <View>
                  <TextRoboto style={styles.generalDetailsLabel}>
                    { I18n.t('pet.details.chipNumber') }
                  </TextRoboto>
                  <TextRoboto style={styles.generalDetails}>
                    { chipNumber }
                  </TextRoboto>
                </View>
              }
            </View>

          </View>

          <View style={styles.pagerItem}>

            <View style={styles.mapAddressContainer}>
              <TextRoboto style={styles.mapAddressLabel}>
                { I18n.t('pet.details.address').toUpperCase() } { I18n.t((type === petTypeLost) ? 'pet.lost.word' : 'pet.found.word').toUpperCase() }
              </TextRoboto>
              <TextRoboto style={styles.mapAddress}>
                { fullAddress }
              </TextRoboto>
            </View>

            <View>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: 400, height: 500, }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </View>

          </View>

        </IndicatorViewPager>

      </View>
    );
  }
}

export default PetDetail;
