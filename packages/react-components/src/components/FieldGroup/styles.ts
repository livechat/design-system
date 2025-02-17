import { css } from '@emotion/css';

export const fieldGroup = (inline?: boolean, stretch?: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: -8px 0;

  > * {
    padding: 0 0 8px;
  }

  ${inline &&
  `
     flex-direction: row;
    margin: 0 -8px;

    > * {
      padding: 0 8px;
    }
    
  `}

  ${stretch &&
  `
    > * {
      width: 100%;
    }
  `}
`;
