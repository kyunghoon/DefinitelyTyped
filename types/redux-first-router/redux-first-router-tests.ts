import { connectRoutes, LocationState, RoutesMap } from 'redux-first-router';
import {
  createStore,
  applyMiddleware,
  Middleware,
  MiddlewareAPI,
  Store,
  Dispatch,
  compose,
  Action,
  GenericStoreEnhancer,
  StoreEnhancerStoreCreator
} from 'redux';
import { History } from 'history';

declare var console: any;
declare var history: History;

type State = LocationState;
type StoreCreator = StoreEnhancerStoreCreator<State>;

const routesMap = {
  HOME: '/'
};

const {
  reducer,
  middleware,
  enhancer,
  initialDispatch
} = connectRoutes(history, routesMap, {
  initialDispatch: false
});

const dumbMiddleware: Middleware = store => next => action => next(action);

const composedMiddleware = applyMiddleware(middleware, dumbMiddleware);

const storeEnhancer = compose<StoreCreator, StoreCreator, StoreCreator>(enhancer, composedMiddleware);

const store = createStore(reducer, storeEnhancer);

// $ExpectType Store<LocationState>
store;
