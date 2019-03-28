export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitch extends React.HTMLAttributes<HTMLDivElement>{
  on?: boolean,
  defaultOn?: boolean,
  size?: ISwitchSizes,
  onToggle?: () => void 
}