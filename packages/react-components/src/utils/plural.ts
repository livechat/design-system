export function plural(
  metric: number,
  singularForm: string,
  pluralForm: string,
  zeroForm?: string
): string {
  if (zeroForm && metric === 0) return zeroForm;

  return metric === 1 ? singularForm : pluralForm;
}
