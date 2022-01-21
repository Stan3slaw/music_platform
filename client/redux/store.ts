import { createWrapper } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, compose, createStore, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { reducer, RootState } from './reducers';

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    // I require this only in dev environment
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function
const makeStore = () => createStore(reducer, bindMiddleware([thunk]));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
