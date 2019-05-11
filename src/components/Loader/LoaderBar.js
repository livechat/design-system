import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';
import { Loader } from './Loader';
import { SIZE, BAR_DIRECTIONS } from './constants';

const cx = classNames.bind(styles);

const baseClass = 'loader-bar';

export class LoaderBar extends React.Component {
  render() {
    const {
      className,
      isVisible,
      size,
      children,
      direction,
      reverse,
      primaryColor,
      secondaryColor,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--hidden`]: isVisible !== undefined && !isVisible,
        [`${baseClass}--${direction}`]: direction && !reverse,
        [`${baseClass}--${direction ||
          BAR_DIRECTIONS.horizontal}-reverse`]: reverse
      }),
      className
    );

    return (
      <div className={mergedClassNames} {...restProps}>
        <Loader
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          size={size || SIZE.medium}
        />
        <div className={cx(`${baseClass}__description`)}>{children}</div>
      </div>
    );
  }
}

LoaderBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  primaryColor: PropTypes.string,
  /**
   * Direction prop defines the placement of loader label. When it `true` label will appear before spinner.
   */
  reverse: PropTypes.bool,
  /**
   * Direction prop defines the placement of loader label.
   */
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * You can unmount Loader when it's not necessary or use `isVisible` prop to control its visibility without unmounting
   */
  isVisible: PropTypes.bool,
  secondaryColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
