import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PetDetail from '../components/PetDetail/PetDetail';

class PetDetailContainer extends Component {
  render() {
    const { pet, userProfile } = this.props;
    return (
      <PetDetail
        pet={pet}
        userProfile={userProfile}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { petKey, petType } = ownProps.navigation.state.params;
  const petItems = state.getIn([ 'pets', petType, 'items' ]);
  const pet = petItems.find(pet => pet.get('key') === petKey);
  return {
    pet,
    userProfile: state.getIn([ 'userProfiles', 'items', pet.get('uid') ]),
  }
};

export default connect(mapStateToProps)(PetDetailContainer);
