/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
//import { graphql } from 'relay-runtime';
import Layout from '../common/Layout';
import { graphql } from 'react-relay';
import about from './About'

type About = typeof about
type ComponentTuple = [About]

export default [
  {
    path: '/about',
    query: graphql`
      query miscAboutQuery {
        ...Layout
      }
    `,
    components: () => [import(/* webpackChunkName: 'about' */ './About')],
    render: ([About]: ComponentTuple, data: any, { config }: any) => ({
      title: `About Us • ${config.app.name}`,
      component: (
        <Layout data={data}>
          <About data={data} />
        </Layout>
      ),
      chunks: ['about'],
    }),
  },
];
