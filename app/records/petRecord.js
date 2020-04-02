import { Record, List } from 'immutable';

const InitPetRecord = Record({
  loading: false,
  error: false,
  items: List(),
  fetched: false,
  errorData: '',
});

export default PetRecord = Record({
  lost: InitPetRecord(),
  found: InitPetRecord(),
});
