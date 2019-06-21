import { ResolvableProps } from "bluebird";

/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */
interface Options {
  width?: number,
  height?: number,
}

function getWindowFeataures(options: Options = {}) {
  const width = options.width || 600;
  const height = options.height || 600;
  const { screenLeft, screenTop, innerWidth, innerHeight, screen } = window;
  const html = window.document.documentElement;

  const dualScreenLeft: number = screenLeft !== undefined ? screenLeft : screen.left;
  const dualScreenTop: number = screenTop !== undefined ? screenTop : screen.top;
  const w = innerWidth || html.clientWidth || screen.width;
  const h = innerHeight || html.clientHeight || screen.height;
  interface Config {
    [key: string]: number,
  }
  const config: Config = {
    width,
    height,
    left: w / 2 - width / 2 + dualScreenLeft,
    top: h / 2 - height / 2 + dualScreenTop,
  };

  return Object.keys(config)
    .map(key => `${key}=${config[key]}`)
    .join(',');
}

interface Executor {
  resolve: (value?: any | PromiseLike<any>) => void,
  reject?: (reason?: any) => void,
}

export function openWindow(uri: string, { onPostMessage, ...options } = {}) {
  const win = window.open(uri, undefined, getWindowFeataures(options));

  let executor: Executor | null

  const onResolve = (data: any) => {
    window.removeEventListener('message', onPostMessageWrapper);

    if (executor) {
      //@ts-ignore
      win.close();
      executor.resolve(data);
      executor = null;
    }
  };

  const onPostMessageWrapper = (event: MessageEvent) => {
    if (onPostMessage) {
      const result = onPostMessage(event);
      if (result) onResolve(result);
    }
  };

  window.addEventListener('message', onPostMessageWrapper.bind(window), true);

  return new Promise(resolve => {
    executor = { resolve };
  });
}
