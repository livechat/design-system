const getMergedClassNames = (classNames, classNameProperty) => {
  if (classNameProperty) {
    return `${classNames} ${classNameProperty}`;
  }
  return classNames;
};

export default getMergedClassNames;
