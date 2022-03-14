import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button';
import { Tooltip as TooltipComponent } from '../components/Tooltip';
import { DropDown, Close } from '@livechat/design-system-icons/dist/material';

import { Icon } from '../components/Icon';
import { Placement } from '@floating-ui/dom';

import './Tooltip.stories.css';

const tooltipPlacements = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

export const Tooltip = (args: any): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <TooltipIconExample {...args}></TooltipIconExample>
  </div>
);

Tooltip.args = {
  placement: 'bottom',
  isVisible: false,
};

export const TooltipInfo = (args: any): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <TooltipInfoExample {...args}></TooltipInfoExample>
  </div>
);

TooltipInfo.args = {
  placement: 'bottom',
  isVisible: false,
};

export interface ITooltipExample {
  placement: Placement;
  isVisible: boolean;
}

const TooltipIcon = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};

const TooltipInfoComponent = ({
  header,
  text,
  closeWithX,
  handleCloseOnClick,
}: {
  header: string;
  text: string;
  closeWithX?: boolean;
  handleCloseOnClick?: () => void;
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {closeWithX && (
        <div className="lc-tooltip-info-x" onClick={handleCloseOnClick}>
          <Icon source={Close}></Icon>
        </div>
      )}
      {header && <div className="lc-tooltip-info-header">{header}</div>}
      <div className="lc-tooltip-info-text">{text}</div>
    </div>
  );
};

const TooltipIconExample: React.FC<ITooltipExample> = ({
  placement,
  isVisible,
}) => {
  return (
    <div
      style={{
        width: '500px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        placement={placement}
        isVisible={isVisible}
        triggerRenderer={() => (
          <div>
            <Button
              icon={<Icon source={DropDown}></Icon>}
              iconPosition={'right'}
            >
              Open Tooltip
            </Button>
          </div>
        )}
      >
        <TooltipIcon text="Simple tooltip" />
      </TooltipComponent>
    </div>
  );
};

const TooltipInfoExample: React.FC<ITooltipExample> = ({
  placement,
  isVisible,
}) => {
  return (
    <div
      style={{
        width: '500px',
        height: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        placement={placement}
        isVisible={isVisible}
        triggerRenderer={() => (
          <div>
            <Button
              icon={<Icon source={DropDown}></Icon>}
              iconPosition={'right'}
            >
              Open Tooltip
            </Button>
          </div>
        )}
      >
        <TooltipInfoComponent
          header="Header - concise and clear"
          text="Tooltip content is used to explain the details of elements or features."
          closeWithX
        />
      </TooltipComponent>
    </div>
  );
};

export default {
  title: 'Components/Tooltip',
  component: TooltipIconExample,
  argTypes: {
    placement: {
      options: tooltipPlacements,
      control: {
        type: 'select',
        labels: 'Placement',
      },
    },
  },
} as ComponentMeta<typeof TooltipIconExample>;
