import * as React from 'react';

import './iconsShowcase.css';
import {
  Icon,
  MaterialIcon,
  MaterialIconsList,
} from '@livechat/design-system-icons';

export const IconsShowcase = (): React.ReactElement => {
  const iconGrid = MaterialIconsList.sort().map((iconName) => {
    return (
      <div className="icon-showcase-card" key={iconName}>
        <Icon
          set="material"
          name={iconName }
          size="xlarge"
        ></Icon>
        <p>{iconName}</p>
      </div>
    );
  });

  return <div className="icons-showcase-wrapper">{iconGrid}</div>;
};
