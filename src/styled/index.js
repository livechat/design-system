import * as React from 'react';
import createEmotionStyled from 'create-emotion-styled';
import {
  compact,
  find,
  isObject,
  mapValuesIndexed,
  pickBy
} from '@livechat/data-utils/dist/data-utils';
import emotion from '../emotion';

const styled = createEmotionStyled(emotion, React);

const registeredComponents = {};

const unpackCss = (props, css) => {
  const basedOnProps = pickBy(isObject, css);

  if (Object.keys(basedOnProps) === 0) {
    return css;
  }

  return compact(
    mapValuesIndexed((value, key) => {
      if (!isObject(value)) {
        return value;
      }

      if (key[0] === ':') {
        return unpackCss(props, value);
      }

      const activeProp = find(prop => props[prop], Object.keys(value));

      return value[activeProp] || value.default;
    }, css)
  );
};

export default (component, options = {}) => {
  const { displayName, displayType } = options;

  if (process.env.NODE_ENV !== 'production' && displayName) {
    if (registeredComponents[displayName]) {
      console.warn(`
        "${displayName}" is already registered. Those names should be unique.
      `);
    }
    registeredComponents[displayName] = true;
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    !displayName &&
    options.section
  ) {
    console.warn('For `section` components valid `displayName` is required.');
  }

  const factory = styled(component, options);

  return (...styles) => {
    const name = displayName || displayType || null;
    const styledComponent = factory(...styles);
    styledComponent.__ui_kit_name = name // eslint-disable-line 
    return styledComponent;
  };
};
