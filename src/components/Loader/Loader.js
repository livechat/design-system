import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { LoaderSpinner } from './LoaderSpinner';
import { SIZE, THICKNESS_FROM_SIZE, THICKNESS } from './constants';

const cx = classNames.bind(styles);

const baseClass = 'loader';

export class Loader extends React.Component {
  render() {
    const {
      className,
      isVisible,
      size,
      primaryColor,
      secondaryColor,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size || SIZE.medium}`]: true,
        [`${baseClass}--hidden`]: isVisible !== undefined && !isVisible
      }),
      className
    );

    return (
      <div className={mergedClassNames} {...restProps}>
        <LoaderSpinner
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          thickness={THICKNESS_FROM_SIZE[size] || THICKNESS.medium}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  className: PropTypes.string,
  /**
   * Changing primary color of spinner
   */
  /**
   * You can unmount Loader when it's not necessary or use `isVisible` prop to control its visibility without unmounting
   */
  isVisible: PropTypes.bool,
  primaryColor: PropTypes.string,
  /**
   * Changing secondary color of spinner
   */
  secondaryColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
