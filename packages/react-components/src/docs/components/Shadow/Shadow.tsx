import * as React from 'react';

import '../Table/Table.css';

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
          <td>ShadowToken.Float</td>
          <td>--shadow-float</td>
          <td>Cards, buttons, other elevated elements</td>
        </tr>
        <tr>
          <td>ShadowToken.PopOver</td>
          <td>--shadow-pop-over</td>
          <td>Popovers</td>
        </tr>
        <tr>
          <td>ShadowToken.Modal</td>
          <td>--shadow-modal</td>
          <td>Modals</td>
        </tr>
        <tr>
          <td>ShadowToken.Tooltip</td>
          <td>--shadow-tooltip</td>
          <td>Tooltips</td>
        </tr>
        <tr>
          <td>ShadowToken.TooltipArrowBottom</td>
          <td>--shadow-tooltip-arrow-bottom</td>
          <td>Tooltip arrow pointing down</td>
        </tr>
        <tr>
          <td>ShadowToken.TooltipArrowTop</td>
          <td>--shadow-tooltip-arrow-top</td>
          <td>Tooltip arrow pointing up</td>
        </tr>
        <tr>
          <td>ShadowToken.TooltipArrowRight</td>
          <td>--shadow-tooltip-arrow-right</td>
          <td>Tooltip arrow pointing right</td>
        </tr>
        <tr>
          <td>ShadowToken.TooltipArrowLeft</td>
          <td>--shadow-tooltip-arrow-left</td>
          <td>Tooltip arrow pointing left</td>
        </tr>
        <tr>
          <td>ShadowToken.Focus</td>
          <td>--shadow-focus</td>
          <td>Focus indicators</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerBottom</td>
          <td>--shadow-divider-bottom</td>
          <td>Separator on bottom of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerTop</td>
          <td>--shadow-divider-top</td>
          <td>Separator on top of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerBottomLeft</td>
          <td>--shadow-divider-bottom-left</td>
          <td>Separator on bottom left of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerTopLeft</td>
          <td>--shadow-divider-top-left</td>
          <td>Separator on top left of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerTopRight</td>
          <td>--shadow-divider-top-right</td>
          <td>Separator on top right of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.DividerBottomRight</td>
          <td>--shadow-divider-bottom-right</td>
          <td>Separator on bottom right of the element</td>
        </tr>
        <tr>
          <td>ShadowToken.MessageBox</td>
          <td>--shadow-message-box</td>
          <td>Message boxes</td>
        </tr>
      </table>
    </div>
  );
};
