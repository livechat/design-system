export type IToggleSwitchSizes = 'regular' | 'compact'
export interface IToggleSwitch {
  on: boolean,
  defaultOn: boolean,
  size: IToggleSwitchSizes,
  onToggle: () => void 
}