/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import { graphql, commitMutation } from 'react-relay';
import { Environment } from 'relay-runtime';

const mutation = graphql`
  mutation LikeStoryMutation($input: LikeStoryInput!) {
    likeStory(input: $input) {
      story {
        id
        pointsCount
        pointGiven
      }
    }
  }
`;

function commit(environment: Environment, input: Model.LikeStoryInput) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { input },
      onCompleted(response, errors) {
        if (errors) {
          reject(errors[0]);
        } else {
          resolve();
        }
      },
      onError: reject,
    });
  });
}

export default { commit };
