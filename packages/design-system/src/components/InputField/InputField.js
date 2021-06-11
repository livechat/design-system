import * as React from 'react';
import * as PropTypes from 'prop-types';
import Input from './Input';
import TextField from '../TextField';

const InputField = React.forwardRef((props, ref) => {
  const {
    inline,
    error,
    description,
    labelText,
    labelAdornment,
    className,
    id,
    fieldClassName,
    labelRightNode,
    inputWidth,
    maxLength,
    ...restProps
  } = props;

  return (
    <TextField
      inline={inline}
      error={error}
      description={description}
      labelText={labelText}
      labelAdornment={labelAdornment}
      className={className}
      htmlFor={id}
      labelRightNode={labelRightNode}
    >
      <Input
        {...restProps}
        ref={ref}
        width={inputWidth}
        className={fieldClassName}
        id={id}
        error={error}
        maxLength={maxLength}
      />
    </TextField>
  );
});

InputField.propTypes = {
  labelText: PropTypes.string,
  /**  specifies additional decorative element rendered at the end of the label */
  labelAdornment: PropTypes.node,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  fieldClassName: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  labelRightNode: PropTypes.node,
  /** use to easily setup input width - by default the input takes 100% of its container width */
  inputWidth: PropTypes.string,
  maxLength: PropTypes.number
};

export default InputField;
