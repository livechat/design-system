import * as React from 'react';

import * as Icons from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../../../components/Icon';
import './iconsShowcase.css';

export const IconsShowcase = () => {
  const iconsGrid = Object.keys(Icons).map((item) => {
    const iconSource = (Icons as any)[item];
    return (
      <div className={'grid'}>
        <Icon source={iconSource} size={IconSizeName.XLarge}></Icon>
        <p>{item}</p>
      </div>
    );
  });

  return <div className={'wrap'}>{iconsGrid}</div>;
};
