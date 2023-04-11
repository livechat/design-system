import * as MaterialIcons from '@livechat/design-system-icons/react/material';
import { ReactElement } from 'react';
import { Icon, IconSource } from '../../components/Icon';
import './iconsShowcase.css';

export type IconsMap = {
  [key: string]: IconSource;
};

const Icons = MaterialIcons as IconsMap;

export const IconsShowcase = (): ReactElement => {
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
