import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextArea from './TextArea';
import TextField from '../TextField';

const TextAreaField = React.forwardRef((props, ref) => {
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
      <TextArea
        id={id}
        ref={ref}
        {...restProps}
        className={fieldClassName}
        error={error}
      />
    </TextField>
  );
});

TextAreaField.propTypes = {
  labelText: PropTypes.string,
  /**  specifies additional decorative element rendered at the end of the label */
  labelAdornment: PropTypes.node,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  fieldClassName: PropTypes.string,
  labelRightNode: PropTypes.node
};

export default TextAreaField;
