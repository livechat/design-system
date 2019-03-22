export type IToggleSwitchSizes = 'large' | 'compact'
export interface IToggleSwitch {
  on: boolean,
  defaultOn: boolean,
  size: IToggleSwitchSizes,
  onToggle: () => void 
}