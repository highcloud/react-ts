/* eslint-disable @typescript-eslint/camelcase */
/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { canUseDOM } from './env';
import { History, LocationKey } from 'history';

type Callback = (pos: number) => void

const listeners = new Set<Callback>();
const scrollPositions = new Map<LocationKey, number>();

let last_known_scroll_position = 0;
let ticking = false;

let history: History;

if (canUseDOM) {
  window.addEventListener('scroll', () => {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (history && history.location && history.location.key) {
          scrollPositions.set(history.location.key, last_known_scroll_position);
        }
        listeners.forEach(cb => cb(last_known_scroll_position));
        ticking = false;
      });
      ticking = true;
    }
  });
}

export function onScroll(cb: Callback) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setHistory(browserHistory: History) {
  history = browserHistory;
}

export function getScrollPosition(locationKey?: LocationKey) {
  if (!locationKey) return undefined

  return scrollPositions.get(locationKey);
}
