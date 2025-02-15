/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { FC, ReactChildren, ReactElement } from 'react';
import { withStyles, Theme, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';

import LayoutToolbar from './LayoutToolbar';
import LayoutFooter from './LayoutFooter';
import AutoUpdater from './AutoUpdater';
import { StoryData } from 'app/news/Story';

const styles: StyleRulesCallback = (theme: Theme) => ({
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
    body: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.palette.background.default,
    },
  },
  background: {
    backgroundColor: '#3f51b5',
    backgroundImage: 'linear-gradient(-225deg, #3db0ef, #5e5bb7)',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
});

export interface Props extends WithStyles {
  //{ classes: s, hero, data, children }
  hero?: FC,
  data: LayoutData,
  children: React.ReactNode,
}
export interface LayoutData {
  me: Model.User,
  story: StoryData,
}
export function Layout(props: Props) {
  const { classes: s, hero, data, children } = props
  return (
    <>
      <LayoutToolbar data={data.me} {...!hero && { className: s.background }} />
      {hero && (
        <div className={s.background}>
          <div className={s.toolbar} />
          {hero}
        </div>
      )}
      {!hero && <div className={s.toolbar} />}
      {children}
      <LayoutFooter />
      <AutoUpdater user={data.me} />
    </>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    Layout,
    graphql`
      fragment Layout on Query {
        me {
          ...LayoutToolbar
          ...AutoUpdater_user
        }
      }
    `,
  ),
);
