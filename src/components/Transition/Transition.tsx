import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionProps = Omit<CSSTransitionProps, ''>;

export const Transition: React.FC<CSSTransitionProps> = (props) => (
  <CSSTransition {...props}>{/* {children} */}</CSSTransition>
);

export default Transition;
