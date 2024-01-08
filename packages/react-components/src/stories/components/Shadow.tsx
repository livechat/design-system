import * as React from 'react';

import './Table.css';

export const Shadow = (): React.ReactElement => {
  return (
    <div>
      <table>
        <tr>
          <th className="enum-column">Enum</th>
          <th className="first-column">Token</th>
          <th className="second-column">Use case</th>
        </tr>
        <tr>
          <td>Float</td>
          <td>--shadow-float</td>
          <td>Cards, buttons, other elevated elements</td>
        </tr>
        <tr>
          <td>PopOver</td>
          <td>--shadow-pop-over</td>
          <td>Popovers</td>
        </tr>
        <tr>
          <td>Modal</td>
          <td>--shadow-modal</td>
          <td>Modals</td>
        </tr>
        <tr>
          <td>Tooltip</td>
          <td>--shadow-tooltip</td>
          <td>Tooltips</td>
        </tr>
        <tr>
          <td>TooltipArrowBottom</td>
          <td>--shadow-tooltip-arrow-bottom</td>
          <td>Tooltip arrow pointing down</td>
        </tr>
        <tr>
          <td>TooltipArrowTop</td>
          <td>--shadow-tooltip-arrow-top</td>
          <td>Tooltip arrow pointing up</td>
        </tr>
        <tr>
          <td>TooltipArrowRight</td>
          <td>--shadow-tooltip-arrow-right</td>
          <td>Tooltip arrow pointing right</td>
        </tr>
        <tr>
          <td>TooltipArrowLeft</td>
          <td>--shadow-tooltip-arrow-left</td>
          <td>Tooltip arrow pointing left</td>
        </tr>
        <tr>
          <td>Focus</td>
          <td>--shadow-focus</td>
          <td>Focus indicators</td>
        </tr>
        <tr>
          <td>DividerBottom</td>
          <td>--shadow-divider-bottom</td>
          <td>Separator on bottom of the element</td>
        </tr>
        <tr>
          <td>DividerTop</td>
          <td>--shadow-divider-top</td>
          <td>Separator on top of the element</td>
        </tr>
        <tr>
          <td>DividerBottomLeft</td>
          <td>--shadow-divider-bottom-left</td>
          <td>Separator on bottom left of the element</td>
        </tr>
        <tr>
          <td>DividerTopLeft</td>
          <td>--shadow-divider-top-left</td>
          <td>Separator on top left of the element</td>
        </tr>
        <tr>
          <td>DividerTopRight</td>
          <td>--shadow-divider-top-right</td>
          <td>Separator on top right of the element</td>
        </tr>
        <tr>
          <td>DividerBottomRight</td>
          <td>--shadow-divider-bottom-right</td>
          <td>Separator on bottom right of the element</td>
        </tr>
        <tr>
          <td>MessageBox</td>
          <td>--shadow-message-box</td>
          <td>Message boxes</td>
        </tr>
      </table>
    </div>
  );
};
