import * as React from 'react';
import classNames from 'classnames/bind';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import Loader from '../Loader';
import Button from './Button';

const cx = classNames.bind(styles);

const LOADER_ANIMATION_TIME = 200;

const ButtonWithLoader = props => {
  const { children, disabled, loading, className } = props;

  const baseClass = 'btn';
  const mergedClassNames = getMergedClassNames(
    cx({
      [`${baseClass}-with-loader`]: true,
      [`${baseClass}-with-loader--disabled`]: disabled,
      [`${baseClass}-with-loader--loading`]: loading
    }),
    className
  );

  return (
    <Button {...props} className={mergedClassNames}>
      <TransitionGroup component={null}>
        {loading && (
          <CSSTransition
            classNames={{
              enter: styles[`${baseClass}__loader-enter`],
              enterActive: styles[`${baseClass}__loader-enter-active`],
              exit: styles[`${baseClass}__loader-exit`],
              exitActive: styles[`${baseClass}__loader-exit-active`]
            }}
            timeout={LOADER_ANIMATION_TIME}
          >
            <div className={styles[`${baseClass}__loader`]}>
              <Loader />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
      <span
        className={cx({
          [`${baseClass}-with-loader__content`]: true,
          [`${baseClass}-with-loader__content--hidden`]: loading
        })}
      >
        {children}
      </span>
    </Button>
  );
};

export default ButtonWithLoader;
