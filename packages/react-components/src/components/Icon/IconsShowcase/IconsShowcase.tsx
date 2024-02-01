import * as React from 'react';

import * as DSIcons from '@livechat/design-system-icons';

import { handleCopyText } from '../../../stories/helpers';
import { Icon, IconSource } from '../index';

import './style.scss';
import { IconName } from './types';

export type IconsMap = {
  [key: string]: IconSource;
};

const Icons = DSIcons as IconsMap;

interface IProps {
  data: IconName[];
}
export const IconsShowcase: React.FC<IProps> = ({ data }) => {
  return (
    <div className="icons-showcase-wrapper sb-unstyled">
      {data.map((item) => {
        const iconSource = Icons[item];

        return (
          <div
            className="icon-showcase-card"
            onClick={() => handleCopyText(item)}
          >
            <Icon source={iconSource} size="large"></Icon>
            <p className="icon-showcase-card-label">{item}</p>
          </div>
        );
      })}
    </div>
  );
};
