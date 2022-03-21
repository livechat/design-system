import * as React from 'react';

declare module '@livechat/design-system-icons/react/*' {
  const components: Record<string, React.ReactElement>;
  export default components;
}
