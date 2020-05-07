/**
 * lerna-alias package needs index.js file in package root to work correctly
 */
import { tokens, formatTokenName } from './tokens';
import { themes } from './themes';

export { tokens, formatTokenName };

export default themes;
