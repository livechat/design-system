import * as React from "react";
import cx from "classnames";

export interface IBadgeProps {
  children: React.ReactElement;
  secondary: boolean;
  className?: string;
}

export const Badge = ({
  children,
  className: extraClassName = "",
  secondary = false,
}: IBadgeProps) => {
  const className = cx("lc-badge", {
    "lc-badge--secondary": secondary,
    [extraClassName]: !!extraClassName,
  });

  return <span className={className}>{children}</span>;
};
