import * as React from 'react';

import '../Table/Table.css';

export const Radius = (): React.ReactElement => {
  return (
    <div>
      <table>
        <tr>
          <th className="first-column">Token</th>
          <th className="second-column">Size</th>
          <th>Usage</th>
        </tr>
        <tr>
          <td>--radius-0</td>
          <td>0px</td>
          <td>
            <b>Sharp corners</b>, when component has no border radius: This
            suggests that certain components should have no rounded corners,
            meaning they should have sharp, square corners without any
            curvature.
          </td>
        </tr>
        <tr>
          <td>--radius-1</td>
          <td>4px</td>
          <td>
            <b>Nested tags</b>. For nested component like tag inside input: This
            description indicates that a 4-pixel border radius is suitable for
            components like tags placed inside input elements, implying a slight
            curvature for these nested elements.
          </td>
        </tr>
        <tr>
          <td>--radius-2</td>
          <td>6px</td>
          <td>
            <b>Nested buttons</b>, nested component like button in segmented
            control: Similarly, using a 6-pixel border radius for components
            like buttons within a segmented control. This slightly rounded edge
            can help visually distinguish nested components.
          </td>
        </tr>
        <tr>
          <td>--radius-3</td>
          <td>8px</td>
          <td>
            <b>Default border radius</b> for all components: This specifies an
            8-pixel border radius as the default for all components, indicating
            that most components should have a moderate level of rounding on
            their corners.
          </td>
        </tr>
      </table>
    </div>
  );
};
