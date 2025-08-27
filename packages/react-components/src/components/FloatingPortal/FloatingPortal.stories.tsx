import { Meta } from '@storybook/react-vite';

import { FloatingPortal } from './FloatingPortal';

export default {
  title: 'Components/FloatingPortal',
  component: FloatingPortal,
  argTypes: {
    children: {
      description: 'The content to render inside the portal.',
      table: {
        type: {
          summary: 'React.ReactNode',
        },
      },
    },
    id: {
      description:
        'The target ID - the portal will be appended to the element with this ID, or the body if not specified.',

      type: 'string',
    },
    root: {
      description: 'The root element to append the portal to.',
      table: {
        type: {
          summary:
            'HTMLElement | null | React.MutableRefObject<HTMLElement | null>',
        },
      },
    },
    preserveTabOrder: {
      description: 'Whether to preserve the tab order of the portal.',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
      type: 'boolean',
    },
  },
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
