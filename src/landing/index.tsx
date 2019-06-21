/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
// import { graphql } from 'relay-runtime';
import { graphql } from 'react-relay';
import Layout from '../common/Layout';
import home from './Home'
import homeHero from './HomeHero'
import { Context } from 'universal-router';

type Home = typeof home
type HomeHero = typeof homeHero
type ComponentTuple = [Home, HomeHero]

const appContextList: [Context] = [
  {
    path: '',
    query: graphql`
      query landingHomeQuery {
        ...Layout
      }
    `,
    components: () => [
      import(/* webpackChunkName: 'home' */ './Home'),
      import(/* webpackChunkName: 'home' */ './HomeHero'),
    ],
    render: ([Home, HomeHero]: ComponentTuple, data, { config }) => ({
      title: config.app.name,
      component: (
        <Layout data={data} hero={<HomeHero />}>
          <Home data={data} />
        </Layout>
      ),
      chunks: ['home'],
    }),
  },
]

export default appContextList;
