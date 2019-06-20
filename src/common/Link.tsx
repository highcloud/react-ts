/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { Children } from 'react';
import { useHistory } from '../hooks';

function isLeftClickEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return event.button === 0;
}

function isModifiedEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

type Props = {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,

};

function Link(props: Props) {
  const history = useHistory();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (props.onClick) {
      props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    //@ts-ignore
    history.push(event.currentTarget.getAttribute('href'));
  }

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} onClick={handleClick} />;
}

export default Link;
