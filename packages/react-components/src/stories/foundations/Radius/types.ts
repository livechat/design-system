import { RadiusTokenKey } from '../../../foundations/radius-token';

export type RadiusShape = {
  enum: RadiusTokenKey;
  token: string;
  size: string;
  desc: string;
  deprecated?: boolean;
};
