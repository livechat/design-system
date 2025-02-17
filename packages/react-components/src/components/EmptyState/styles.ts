import { css } from '@emotion/css';

import { RadiusToken, SpacingToken } from '../../foundations';

type EmptyStateType = 'inline' | 'full';

export const emptyState = (type: string, centered: boolean) => css`
  display: flex;
  align-items: center;

  ${centered &&
  `
    justify-content: center;
    width: 100%;
    height: 100%;
    `}

  ${type === 'inline' &&
  `
    flex-direction: row;
    justify-content: space-between;
  `}

  ${type === 'full' &&
  `
    flex-direction: column;
    justify-content: center;
    padding: var(${SpacingToken.Spacing16}) var(${SpacingToken.Spacing6});

    @media (width <= 600px) {
      padding: var(${SpacingToken.Spacing8}) var(${SpacingToken.Spacing6});
    }
  `}
`;

export const emptyStateImage = css`
  margin-bottom: var(${SpacingToken.Spacing6});
  border-radius: var(${RadiusToken.Radius4});
  width: auto;
  max-width: min(100%, 600px);
  height: auto;
  max-height: min(100%, 300px);
  object-fit: contain;
`;

export const emptyStateContentInline = css`
  display: flex;
  gap: var(${SpacingToken.Spacing2});
  align-items: center;
`;

export const emptyStateIcon = (type: string) => css`
  ${type === 'full' &&
  `
    margin-bottom: var(${SpacingToken.Spacing2});
  `}
`;

export const emptyStateTitle = css`
  margin: 0;
  margin-bottom: var(${SpacingToken.Spacing2});
  max-width: 600px;
  text-align: center;
`;

export const emptyStateDescription = css`
  max-width: 600px;
  text-align: center;
`;

export const emptyStateActions = (type: EmptyStateType) => css`
  display: flex;
  gap: var(${SpacingToken.Spacing2});
  margin-top: ${type === 'inline' ? '0' : `var(${SpacingToken.Spacing4})`};

  @media (width <= 600px) {
    flex-direction: column;
    margin-top: ${type === 'inline' ? '0' : `var(${SpacingToken.Spacing2})`};
  }
`;
