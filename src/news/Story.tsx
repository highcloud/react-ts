/**
* React Starter Kit for Firebase
* https://github.com/kriasoft/react-firebase-starter
* Copyright (c) 2015-present Kriasoft | MIT License
*/

/* @flow */

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { graphql, createFragmentContainer } from 'react-relay';

import Link from '../common/Link';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    ...theme.mixins.content,
  },
});
export interface Props extends WithStyles {
  data: StoryData,
}
export interface StoryData {
  id: string,
  title: string, text: string, isURL: boolean,
  author: Model.User,
  slug: string,
  createdAt: string,
  pointsCount: number,
  pointGiven: boolean,
}
export function Story(props: Props) {
  const { classes: s } = props
  const { title, text, isURL } = props.data
  return (
    <div className={s.root}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {isURL ? (
        <Typography>
          <a href={text}>{text}</a>
        </Typography>
      ) : (
          text &&
          text.split('\n').map(x => <Typography gutterBottom>{x}</Typography>)
        )}
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <Button href="/news"> {/*bug ?*/}
          <Link>Go back</Link>
        </Button>
      </div>
    </div>
  );
}
export type StoryElement = React.FC<Props>
export default withStyles(styles)(
  createFragmentContainer(
    Story,
    graphql`
      fragment Story on Story {
        title
        text
        isURL
      }
    `,
  ),
);
