/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import UniversalRouter, { Context, Routes, RouteContext } from 'universal-router';
//import { fetchQuery } from 'relay-runtime';
import { fetchQuery } from 'react-relay';

import landing from './landing';
import legal from './legal';
import misc from './misc';
import user from './user';
import news from './news';
import { AppContext } from './@types';

const routes: Routes<AppContext, {}> = [
  ...landing,
  ...legal,
  ...misc,
  ...user,
  ...news,
  {
    path: '/admin',

    getchildren: () => import(/* webpackChunkName: 'admin' */ './admin'),
  },
];

function resolveRoute(ctx) {
  const { route, params, relay } = ctx;

  // Allow to load routes on demand
  if (typeof route.children === 'function') {
    return route.children().then(x => { //wjp:question: ambiguity? one name for 2 purposes is anti-pattern
      route.children = x.default;
      return undefined;
    });
  }

  // Skip routes without render() function
  if (!route.render) {
    return undefined;
  }

  // Start fetching data from GraphQL API
  const cacheConfig = { payload: null };
  const variables = route.variables ? route.variables(params, ctx) : params;
  const dataPromise =
    route.query && fetchQuery(relay, route.query, variables, cacheConfig);

  // Start downloading missing JavaScript chunks
  const componentsPromise = route.components
    ? route.components().map(x => x.then(x => x.default))
    : [];

  return Promise.all([...componentsPromise, dataPromise]).then(components => {
    // GraphQL API response
    const data = components.pop();
    const { payload } = cacheConfig;

    // If API response contains an authentication error,
    // redirect the user to a login page
    const error = ((payload && payload.errors) || [])
      .map((x: ErrorInfo) => x.originalError || x)
      .find(x => [401, 403].includes(x.code));

    if (error) {
      const errorMsg = encodeURIComponent(error.message);
      const returnTo = encodeURIComponent(ctx.pathname);
      return {
        redirect: `/login?error=${errorMsg}&return=${returnTo}`,
      };
    }

    const renderContext = { ...ctx, variables };
    const result = route.render(components, data, renderContext);
    return result
      ? {
        ...result,
        query: route.query,
        variables,
        data,
        payload,
        render: props =>
          route.render(components, props, renderContext).component,
      }
      : undefined;
  });
}

function errorHandler(error, context): ErrorStatus {
  return {
    title: error.code === 404 ? 'Page not found' : 'System Error',
    status: `${error.code || 500}`,
    error,
  };
}

export default new UniversalRouter<AppContext>(routes, {
  resolveRoute,
  errorHandler,
});

interface ErrorInfo extends Error {
  status?: number,
  code: number,
  originalError?: ErrorInfo,
}
interface ErrorStatus {
  title: string,
  status: string,
  error: any,
}
