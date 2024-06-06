import { RadiusTokenKey } from '../../../foundations/radius-token';

export interface RadiusShape {
  enum: RadiusTokenKey;
  token: string;
  size: string;
  desc: string;
  deprecated?: boolean;
}
