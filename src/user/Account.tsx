/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { graphql, createFragmentContainer } from 'react-relay';
import { User } from 'app/types/model';

const styles: StyleRules = {
  container: {
    maxWidth: 600,
    boxSizing: 'border-box',
    margin: '0 auto',
  },
  content: {
    padding: '1em 2em',
    margin: '2em 0',
  },
};
interface Props extends WithStyles {
  user: User,
}
function Account(props: Props) {
  const { classes: s } = props
  return (
    <div className={s.container}>
      <Card className={s.content}>
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>
        <Typography paragraph>
          Welcome, {props.user && props.user.displayName}!
        </Typography>
      </Card>
    </div>
  );
}

export default withStyles(styles)(
  createFragmentContainer(
    Account,
    graphql`
      fragment Account on Query {
        me {
          id
          username
          displayName
          photoURL
        }
      }
    `,
  ),
);
