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
  constructor(props) {
    super(props);

    this.state = {
      isVisible: !props.timeout
    };
  }

  componentDidMount() {
    if (this.props.timeout) {
      this.timerId = setTimeout(
        () => this.setState({ isVisible: true }),
        this.props.timeout
      );
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  timerId = null;

  render() {
    const {
      className,
      timeout,
      size,
      primaryColor,
      secondaryColor,
      ...restProps
    } = this.props;

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--${size || SIZE.medium}`]: true,
        [`${baseClass}--hidden`]: !this.state.isVisible
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
  primaryColor: PropTypes.string,
  /**
   * Use this props to delay loader visibilty change (number of miliseconds).
   */
  timeout: PropTypes.number,
  /**
   * Changing secondary color of spinner
   */
  secondaryColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
