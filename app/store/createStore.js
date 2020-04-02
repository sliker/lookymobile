import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers/index'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
  stateTransformer: (state) => state.toJS(),
});

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunk,
      loggerMiddleware,
    )
  );

  return createStore(reducer, initialState, enhancer);
}
