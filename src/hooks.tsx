/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { useContext, useEffect, EffectCallback } from 'react';
import { ReactRelayContext } from 'react-relay';
import { fb } from './utils';
import { History, createLocation, createBrowserHistory } from 'history';

// Default history object (for unit tests)
const history: History = createBrowserHistory();
const location = createLocation({ pathname: '/' })
history.push(location)

export const ConfigContext = React.createContext({});
export const HistoryContext = React.createContext(history);
export const ResetContext = React.createContext(() => { });

export function useConfig() {
  return useContext(ConfigContext);
}

export function useHistory() {
  return useContext(HistoryContext);
}

export function useRelay() {
  return useContext(ReactRelayContext);
}

export function useReset() {
  return useContext(ResetContext);
}

export function useFacebookEvent(event: fb.FacebookEventType, callback: EffectCallback, deps = []) {
  useEffect(() => {
    fb((FB: fb.FacebookStatic) => FB.Event.subscribe(event, callback), { async: false });//todo:warning: fb function second parameter not used
    return fb((FB: fb.FacebookStatic) => FB.Event.unsubscribe(event, callback), { async: false });
  }, deps);
}
