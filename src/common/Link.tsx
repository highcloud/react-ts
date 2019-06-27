/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import React, { AnchorHTMLAttributes, DetailedHTMLFactory, Children, MouseEvent, MouseEventHandler } from 'react';
import { useHistory } from '../hooks';

function isLeftClickEvent(event: MouseEvent) {
  return event.button === 0;
}

function isModifiedEvent(event: MouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface Props {
  onClick: MouseEventHandler,
}

function Link(props: Props) {
  const history = useHistory();

  function handleClick(event: MouseEvent) {
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
  return <a {...props} onClick={handleClick} >{Children}</a>;
}

export default Link;
