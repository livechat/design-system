import * as React from "react";

export interface IButtonProps {
  title: string;
}

export const Button = ({ title = "ok" }: IButtonProps) => (
  <div className="btn">{title}</div>
);
