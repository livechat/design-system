export const handleCopyText = (text: string): void => {
  void navigator.clipboard.writeText(text);
  alert(`"${text}" copied to clipboard`);
};
