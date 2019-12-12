export function copyToClipboard(value) {
  // Create new element
  const el = document.createElement('textarea');
  // Set value (string to be copied)
  el.value = value;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  const result = document.execCommand('copy');
  // Remove temporary element
  document.body.removeChild(el);

  return !!result;
}
