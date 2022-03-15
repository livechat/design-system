import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button';
import { Tooltip as TooltipComponent } from '../components/Tooltip';
import { DropDown, Smiles } from '@livechat/design-system-icons/dist/material';

import { Icon } from '../components/Icon';
import { Placement } from '@floating-ui/dom';

import './Tooltip.stories.css';
import { TooltipIcon } from '../components/Tooltip/TooltipIcon';
import { TooltipInfo as TooltipInfoComponent } from '../components/Tooltip/TooltipInfo';

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
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <span className={'lc-tooltip-icon-wrap'}>
      <TooltipIconExample {...args}></TooltipIconExample>
    </span>
    <span className={'lc-tooltip-icon-wrap'}>
      <Icon source={Smiles}></Icon>
    </span>
    <span className={'lc-tooltip-icon-wrap'}>
      <Icon source={Smiles}></Icon>
    </span>
  </div>
);

Tooltip.args = {
  placement: 'bottom',
  isVisible: false,
};

export const TooltipInfo = (args: any) => (
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
  isVisible: true,
};

export interface ITooltipExample {
  placement: Placement;
  isVisible: boolean;
}

const TooltipIconExample: React.FC<ITooltipExample> = ({
  placement,
  isVisible,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TooltipComponent
        placement={placement}
        isVisible={isVisible}
        triggerRenderer={() => <Icon source={Smiles}></Icon>}
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
