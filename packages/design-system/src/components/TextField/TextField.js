import * as React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./style.scss";
import FieldLabel from "../FieldLabel";
import FieldError from "../FieldError";
import FieldDescription from "../FieldDescription";
import getMergedClassNames from "../../utils/getMergedClassNames";

const cx = classNames.bind(styles);

const TextField = props => {
  const {
    inline,
    error,
    description,
    labelText,
    labelAdornment,
    className,
    htmlFor,
    children,
    labelRightNode    
  } = props;

  const baseClass = "text-field";
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--inline`]: inline
    }),
    className
  );

  return (
    <div className={mergedClassNames}>
      {labelRightNode && inline && (
        <React.Fragment>
          <div className={cx([`${baseClass}__label-right-node`, `${baseClass}__label-right-node--inline`])}>
            {labelRightNode}
          </div>
          <div className={cx(`${baseClass}__row-break`)}></div>
        </React.Fragment>
      )}
      <div className={cx([`${baseClass}__wrapper`, inline && `${baseClass}__wrapper--inline`])}>
        {(labelText || labelRightNode ) && (
          <div className={cx([`${baseClass}__label`, inline && `${baseClass}__label--inline`, !labelText && `${baseClass}__label--no-text`])}>
            {labelText && (
              <div
                className={cx(`${baseClass}__label-wrapper`)}
              >
                <FieldLabel htmlFor={htmlFor}>{labelText}</FieldLabel>
                {labelAdornment && (
                  <div className={cx(`${baseClass}__label-adornment`)}>
                    {labelAdornment}
                  </div>
                )}
              </div>
            )}
            {labelRightNode && !inline && (
              <div className={cx(`${baseClass}__label-right-node`)}>
                {labelRightNode}
              </div>
            )}
          </div>
        )}
        <div className={cx(`${baseClass}__content`)}>
          {children}
          {error && <FieldError>{error}</FieldError>}
          {description && <FieldDescription>{description}</FieldDescription>}
        </div>
      </div>
    </div>
  );
};

TextField.propTypes = {
  labelText: PropTypes.string,
  /**  specifies additional decorative element rendered at the end of the label */
  labelAdornment: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node,
  labelRightNode: PropTypes.node
};

export default TextField;
