import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";
import getMergedClassNames from "../../utils/getMergedClassNames";

const cx = classNames.bind(styles);

const ButtonsWrapper = React.forwardRef((props, ref) => {
  const { children, className } = props;

  const baseClass = "btns-wrapper";
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true
    }),
    className
  );

  return (
    <div ref={ref} className={mergedClassNames}>
      {children}
    </div>
  );
});

ButtonsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ButtonsWrapper;
