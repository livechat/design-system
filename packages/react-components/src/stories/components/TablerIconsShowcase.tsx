import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { Icon, IconSource } from '../../components/Icon';
import './iconsShowcase.css';

export type IconsMap = {
  [key: string]: IconSource;
};

const Icons = TablerIcons as IconsMap;

export const TablerIconsShowcase = (): React.ReactElement => {
  const iconsGrid = Object.keys(Icons).map((item) => {
    const iconSource = Icons[item];

    return (
      <div className="icon-showcase-card">
        <Icon source={iconSource} size="xlarge"></Icon>
        <p>{item}</p>
      </div>
    );
  });

  return <div className="icons-showcase-wrapper">{iconsGrid}</div>;
};
