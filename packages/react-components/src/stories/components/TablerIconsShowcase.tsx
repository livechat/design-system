import * as React from 'react';

import './iconsShowcase.css';
import {
  Icon,
  TablerIcon,
  TablerIconsList,
} from '@livechat/design-system-icons';

export const TablerIconsShowcase = (): React.ReactElement => {
  const iconGrid = TablerIconsList.sort().map((iconName) => {
    return (
      <div className="icon-showcase-card" key={iconName}>
        <Icon name={iconName as TablerIcon} size="xlarge"></Icon>
        <p>{iconName}</p>
      </div>
    );
  });

  return <div className="icons-showcase-wrapper">{iconGrid}</div>;
};
