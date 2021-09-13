import * as React from "react";
import { ComponentMeta } from "@storybook/react";

import { Badge as BadgeComponent, IBadgeProps } from "../components/Badge";

export default {
  title: "Components/Badge",
  component: BadgeComponent,
} as ComponentMeta<typeof BadgeComponent>;

interface IBadgeArgs extends IBadgeProps {
  label: string;
}

export const Badge = (args: IBadgeArgs): React.Element => (
  <div>
    <BadgeComponent {...args} /> {args.label}
  </div>
);

Badge.args = {
  secondary: false,
  children: "7",
  label: "Tickets",
};
