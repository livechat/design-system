import { SpacingTokenKey } from '../../../foundations/spacing-token';

export interface SpacingShape {
  enum: SpacingTokenKey;
  token: string;
  size: string;
  desc: string;
}
