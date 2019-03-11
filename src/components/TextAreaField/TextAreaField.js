import * as React from 'react';
import * as PropTypes from 'prop-types';
import TextArea from './TextArea';
import TextField from '../TextField';

const TextAreaField = props => {
  const {
    inline,
    error,
    description,
    labelText,
    className,
    id,
    fieldClassName,
    ...restProps
  } = props;

  return (
    <TextField
      inline={inline}
      error={error}
      description={description}
      labelText={labelText}
      className={className}
      htmlFor={id}
    >
      <TextArea
        id={id}
        {...restProps}
        className={fieldClassName}
        error={error}
      />
    </TextField>
  );
};

TextAreaField.propTypes = {
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  inline: PropTypes.bool,
  error: PropTypes.string,
  description: PropTypes.node,
  fieldClassName: PropTypes.string
};

export default TextAreaField;
