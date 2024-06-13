import { getSpinnerColors } from './Button.helpers';

const setup1 = {
  primaryColor: 'var(--action-primary-default)',
  secondaryColor: 'var(--border-invert-primary)',
};
const setup2 = {
  primaryColor: 'var(--content-invert-primary)',
  secondaryColor: 'var(--surface-invert-secondary)',
};

describe('getSpinnerColors', () => {
  it('should return correct tokens setup for supported kinds', () => {
    const primaryTokens = getSpinnerColors('primary');
    const destructiveTokens = getSpinnerColors('destructive');
    const linkInvertedTokens = getSpinnerColors('link-inverted');

    expect(primaryTokens).toEqual(setup1);
    expect(destructiveTokens).toEqual(setup1);
    expect(linkInvertedTokens).toEqual(setup2);
  });

  it('should return undefined for not supported kind', () => {
    const basicTokens = getSpinnerColors('basic');

    expect(basicTokens).toBeUndefined();
  });
});
