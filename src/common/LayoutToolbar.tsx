/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import cx from 'classnames';
import React, { useState, MouseEvent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme } from '@material-ui/core/styles';
import { graphql, createFragmentContainer, GraphqlInterface } from 'react-relay';

import Link from './Link';
import LoginLink from './LoginLink';
import LayoutToolbarMenu from './LayoutToolbarMenu';
import { useConfig } from '../hooks';
import { WithStyles, StyleRulesCallback } from '@material-ui/core';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.monoFamily,
    fontWeight: 100,
  },
  avatar: {
    marginLeft: theme.spacing.unit,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    textTransform: 'none',
    fontWeight: 400,
  },
});

interface Props extends WithStyles {
  data: Model.User,
  className?: string,
}
function LayoutToolbar(props: Props) {
  const { classes: s, data: me, className } = props
  const [userMenuEl, setUserMenuEl] = useState(null as EventTarget | null);
  const { app } = useConfig();

  function openUserMenu(event: MouseEvent) {
    if (!event) return;
    setUserMenuEl(event.currentTarget);
  }

  function closeUserMenu() {
    setUserMenuEl(null);
  }

  return (
    <AppBar className={cx(s.root, className)} position="absolute" elevation={0}>
      <Toolbar>
        <Typography className={s.title} variant="h6" color="inherit">
          <Link className={s.link} href="/">
            {app.name}
          </Link>
        </Typography>
        <Button
          className={s.button}
          color="inherit"
          component={Link}
          href="/news"
        >
          News
        </Button>
        {me ? (
          <>
            <Avatar
              className={s.avatar}
              src={me.photoURL}
              alt={me.displayName}
              onClick={openUserMenu}
              aria-owns={userMenuEl ? 'user-menu' : undefined}
              aria-haspopup="true"
            />
            <LayoutToolbarMenu
              id="user-menu"
              role="menu"
              open={Boolean(userMenuEl)}
              anchorEl={userMenuEl}
              onClose={closeUserMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: -56,
                horizontal: 82,
              }}
            />
          </>
        ) : (
            <Button className={s.button} color="inherit" >
              <LoginLink>Sign In</LoginLink>
            </Button>
          )}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    LayoutToolbar,
    graphql`
      fragment LayoutToolbar on User {
        id
        displayName
        photoURL
      }
    `,
  ),
);
