export const handleCopyText = (text: string): void => {
  void navigator.clipboard.writeText(text).then(() => {
    alert(`"${text}" copied to clipboard`);
  });
};

export const sortDeprecated = (
  a: { deprecated?: boolean },
  b: { deprecated?: boolean }
): number => {
  if (a.deprecated === b.deprecated) {
    return 0;
  } else {
    return a.deprecated ? 1 : -1;
  }
};
