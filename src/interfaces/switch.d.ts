export type ISwitchSizes = 'basic' | 'compact'
export interface ISwitch {
  on?: boolean,
  defaultOn?: boolean,
  size?: ISwitchSizes,
  onToggle?: () => void 
}