import { fromJS } from 'immutable';

import {
  GET_NEARBY_LOST_PETS,
  GET_NEARBY_LOST_PETS_SUCCESS,
  GET_NEARBY_LOST_PETS_ERROR,
} from './petsActionTypes';

import PetRecord from '../../records/petRecord';

const initialState = PetRecord();

export default function pets(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NEARBY_LOST_PETS:
      const lostPets = state
        .get('lost')
        .set('loading', true)
        .set('error', false);
      return state.set('lost', lostPets);

      /* return {
        ...state,
        lost: Object.assign({}, state.lost, {
          isFetching: true,
          loading: true,
          error: false,
        })
      }; */
    case GET_NEARBY_LOST_PETS_SUCCESS:
      return (() => {
        const petList = action.payload;
        const lostPets = state
          .get('lost')
          .set('loading', false)
          .set('fetched', true)
          .set('error', false)
          .set('items', fromJS(petList));
        return state.set('lost', lostPets);
      })();

      /* return {
        ...state,
        lost: Object.assign({}, state.lost, {
          loading: false,
          error: false,
          isFetching: false,
          fetched: true,
          items: Object.assign({}, state.lost.items, petList)
        })
      }; */
    case GET_NEARBY_LOST_PETS_ERROR:
      return (() => {
        const lostPets = state
          .get('lost')
          .set('loading', false)
          .set('error', true)
          .set('errorData', action.payload);
        return state.set('lost', lostPets);
      })();

      /* return {
        ...state,
        lost: Object.assign({}, state.lost, {
          loading: false,
          error: true,
          errorData: action.payload,
        })
      }; */
    default:
      return state;
  }
}
