/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import loadScript from 'load-script';
import { canUseDOM } from './env';

type callback = (FB: fb.FacebookStatic) => void;

let initialized = false;
let queue: callback[] | null = [];


export function fb(callback: callback) {
  if (!canUseDOM) {
    return;
  } else if (initialized) {
    callback(window.FB);
  } else {
    //@ts-ignore
    queue.push(callback);
    if (!window.fbAsyncInit) {
      // https://developers.facebook.com/docs/javascript/reference/FB.init
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: window.config.facebook.appId,
          autoLogAppEvents: true,
          status: true,
          cookie: true,
          xfbml: false,
          version: 'v3.2',
        });
        initialized = true;
        //@ts-ignore
        queue.forEach(cb => cb(window.FB));
        queue = null;
      };
      const isDebug = window.localStorage.getItem('fb:debug') === 'true';
      loadScript(`https://connect.facebook.net/en_US/sdk/xfbml.customerchat${isDebug ? '/debug' : ''}.js`, { async: true }); // prettier-ignore
    }
  }
}
