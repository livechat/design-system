import * as React from 'react';

import * as MaterialIcons from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../../../components/Icon';
import './iconsShowcase.css';

export type IconsMap = {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const Icons = MaterialIcons as IconsMap;

export const IconsShowcase = (): React.ReactElement => {
  const iconsGrid = Object.keys(Icons).map((item) => {
    const iconSource = Icons[item];
    return (
      <div className={'card'}>
        <Icon source={iconSource} size={IconSizeName.XLarge}></Icon>
        <p>{item}</p>
      </div>
    );
  });

  return <div className={'wrapper'}>{iconsGrid}</div>;
};
