import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Badge as BadgeComponent } from "../components/Badge";

export default {
  title: "Components/Badge",
  component: BadgeComponent,
} as ComponentMeta<typeof BadgeComponent>;

export const Badge = (args) => (
  <div>
    <BadgeComponent {...args} /> {args.label}
  </div>
);

Badge.args = {
  secondary: false,
  children: "7",
  label: "Tickets",
};
