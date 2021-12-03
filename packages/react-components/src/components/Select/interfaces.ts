export interface ISelectItem {
  key: string;
  props: {
    name: string;
    value: string;
    hidden?: boolean;
  };
}
