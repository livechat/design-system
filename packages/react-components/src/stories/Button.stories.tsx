import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Button as ButtonComponent } from "../components/Button";

export default {
  title: "Components/Button",
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

export const Button = (args) => <ButtonComponent {...args} />;
