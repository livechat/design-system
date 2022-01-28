export interface ISelectItem {
  key: string;
  props: {
    [key: string]: string;
  };
  hidden?: boolean;
}
