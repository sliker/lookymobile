import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ImmutableListView } from 'react-native-immutable-list-view';

import { colors } from '../styles/Theme';
import { fetchNearbyPets } from '../data/pets/petsActions';

import PetCard from '../components/PetCard/PetCard';


class LostPetsContainer extends Component {
  constructor(props) {
    super(props);

    this.openPetDetail = this.openPetDetail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { userLatitude, petsLoading, fetchedLostPets, lostPetsError } = nextProps;
    if (userLatitude && !petsLoading && !fetchedLostPets && !lostPetsError) {
      this.props.petsActions.fetchNearbyPets('lost');
    }
  }

  openPetDetail(petKey, petName) {
    this.props.navigation.navigate('PetDetail', {
      petKey,
      petName,
      petType: 'lost',
    });
  }

  render() {
    const { petsLoading, userProfilesLoading, lostPetsItems, fetchedLostPets, userProfilesItems } = this.props;

    if (!fetchedLostPets || petsLoading || userProfilesLoading) {
      return (
        <ActivityIndicator
          color={colors.primary}
          size="large"
          style={{ marginTop: 30 }}
        />
      )
    }

    if (lostPetsItems.size === 0) {
      // TODO: add no published info
      return <Text>No pets published in this area.</Text>
    }

    return (
      <View style={{ flex: 1, marginBottom: 8 }}>
        <ImmutableListView
          immutableData={lostPetsItems}
          renderRow={(pet) => {
            if (!pet) {
              return null;
            }

            return (
              <PetCard
                pet={pet}
                userProfile={userProfilesItems.get(pet.get('uid'))}
                onPress={this.openPetDetail}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    petsLoading: state.getIn([ 'pets', 'lost', 'loading' ]),
    lostPetsItems: state.getIn([ 'pets', 'lost', 'items' ]),
    fetchedLostPets: state.getIn([ 'pets', 'lost', 'fetched' ]),
    lostPetsError: state.getIn([ 'pets', 'lost', 'error' ]),
    userLatitude: state.getIn([ 'user', 'profile', 'latitude' ]),
    userProfilesLoading: state.getIn([ 'userProfiles', 'loading' ]),
    userProfilesItems: state.getIn([ 'userProfiles', 'items' ]),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    petsActions: bindActionCreators({
      fetchNearbyPets: fetchNearbyPets,
    }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LostPetsContainer);
