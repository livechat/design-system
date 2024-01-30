import * as React from 'react';

import * as DSIcons from '@livechat/design-system-icons';

import { handleCopyText } from '../../../stories/helpers';
import { Icon, IconSource } from '../index';
import './style.scss';

export type IconsMap = {
  [key: string]: IconSource;
};

const Icons = DSIcons as IconsMap;

export const IconsShowcase: React.FC = () => {
  return (
    <div className="icons-showcase-wrapper">
      {Object.keys(Icons).map((item) => {
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
