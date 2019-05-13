export function buildPopperModifiers(modifiers) {
  const { offset, flip, hide, preventOverflow, arrow, ...rest } = modifiers;
  const arrowProps = { enabled: true, ...(arrow || {}) };

  return {
    offset: {
      offset: arrowProps.enabled ? '0, 8' : '0, 4',
      ...(offset || {})
    },
    flip: { enabled: true, behavior: 'flip', ...(flip || {}) },
    arrow: arrowProps,
    preventOverflow: {
      enabled: true,
      escapeWithReference: true,
      boundariesElement: 'viewport',
      ...(preventOverflow || {})
    },
    hide: { enabled: true, ...(hide || {}) },
    ...rest
  };
}

export function buildPopperTooltipStyle(
  popperCalculatedStyle,
  propsStyle,
  zIndex,
  transitionDuration,
  transitionDelay
) {
  return {
    ...popperCalculatedStyle,
    ...propsStyle,
    zIndex,
    transitionDuration: `${transitionDuration}ms`,
    transitionDelay: `${transitionDelay}ms`
  };
}
