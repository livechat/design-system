export type IToggleSwitchSizes = 'basic' | 'compact'
export interface IToggleSwitch {
  on?: boolean,
  defaultOn?: boolean,
  size?: IToggleSwitchSizes,
  onToggle?: () => void 
}