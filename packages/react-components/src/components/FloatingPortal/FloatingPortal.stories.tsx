import { Meta } from '@storybook/react';

import { FloatingPortal } from './FloatingPortal';

export default {
  title: 'Components/FloatingPortal',
  component: FloatingPortal,
} as Meta<typeof FloatingPortal>;

export const Basic = () => {
  return (
    <div style={{ padding: '10px', backgroundColor: 'lightblue' }}>
      <FloatingPortal>
        While this component is logically a child of the light-blue div, it will
        be appended to the body instead.
      </FloatingPortal>
    </div>
  );
};
export const Targeted = () => {
  return (
    <>
      <div style={{ padding: '10px', backgroundColor: 'lightblue' }}>
        <FloatingPortal id="box">
          While this component is a child of the light-blue div within React,
          it'll be appended to the light-green div instead.
        </FloatingPortal>
      </div>
      <div
        id="box"
        style={{ padding: '10px', backgroundColor: 'lightgreen' }}
      ></div>
    </>
  );
};
