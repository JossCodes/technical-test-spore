export interface IAlertModal {
  type: ModalTypes[keyof ModalTypes];
  active: boolean;
  onClose: () => void;
  title: string;
  message?: string;
}

interface ITypeStyle {
  classType: string;
  icon: JSX.Element;
}

export interface ITypeStyles {
  [key: string]: ITypeStyle;
}

export type ModalTypes = {
  danger: "danger";
  success: "success";
  warning: "warning";
  info: "info";
};
