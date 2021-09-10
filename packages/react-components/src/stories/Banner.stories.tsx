import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Banner as BannerComponent, BannerSize, BannerType } from "../components/Banner";

export default {
  title: "Components/Banner",
  component: BannerComponent,
} as ComponentMeta<typeof BannerComponent>;

export const Banner = (args) => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. 
        That usually means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

Banner.args = {
  type: BannerType.Info,
  size: BannerSize.Small,
  onClose: () => { alert('onClose click') }
}
