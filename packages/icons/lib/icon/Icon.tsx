import { HTMLAttributes, useMemo, Suspense } from 'react';

import { icons } from './icons';

export type IconSet = keyof typeof icons;
export type IconName = keyof (typeof icons)[IconSet];

interface Props extends HTMLAttributes<HTMLDivElement> {
  set?: IconSet;
  icon: IconName;
  className?: string;
  rotate?: number;
}

/**
 *
 * @param set string set of icons
 * @param icon string key icon name
 * @param className string classes for styling
 * @param rotate optional number rotation of the icon
 * @returns Icon react component
 */
export const Icon = ({ set = 'tabler', icon, className, ...rest }: Props) => {
  const SvgIcon = useMemo(() => icons[set][icon], [set, icon]);
  if (!SvgIcon) return null;

  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...rest}
    >
      <Suspense fallback={<div>icon is loading...</div>}>
        <SvgIcon />
      </Suspense>
    </div>
  );
};
