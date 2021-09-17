import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Promo as PromoComponent, PromoSize } from "../components/Promo";

export default {
  title: "Components/Promo",
  component: PromoComponent,
} as ComponentMeta<typeof PromoComponent>;

export const Promo = (args) => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. 
        That usually means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

<Promo size="small" header="This example headline has 40 characters" onClose={()=>window.alert('close')} linkText="Link button" buttonText="Primary action"   img="https://via.placeholder.com/100"
> A description with a <b>maximum of 100</b> characters. That usually means only one or two sentences. </Promo>

Promo.args = {
  buttonText: null,
  header: "This example headline has 40 characters",
  img: "https://via.placeholder.com/100",
  light: false,
  linkText: false,
  size: PromoSize.Small,
  onClose: () => { alert('onClose click') }
}
