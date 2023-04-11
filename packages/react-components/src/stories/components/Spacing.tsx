import { ReactElement } from 'react';
import './Spacing.css';

export const Spacing = (): ReactElement => {
  return (
    <div>
      <table>
        <tr>
          <th className="first-column">Token</th>
          <th className="second-column">Size</th>
          <th>Usage</th>
        </tr>
        <tr>
          <td>--spacing-0</td>
          <td>0px</td>
          <td>When objects are not separated</td>
        </tr>
        <tr>
          <td>--spacing-05</td>
          <td>2px</td>
          <td>Use for really small spaces, where every pixel counts</td>
        </tr>
        <tr>
          <td>--spacing-1</td>
          <td>4px</td>
          <td>Use for really small spaces, where every pixel counts</td>
        </tr>
        <tr>
          <td>--spacing-2</td>
          <td>8px</td>
          <td>Use for small spaces, where every pixel counts</td>
        </tr>
        <tr>
          <td>--spacing-3</td>
          <td>12px</td>
          <td>
            Use for inner paddings in smaller components, for example tooltips
          </td>
        </tr>
        <tr>
          <td>--spacing-4</td>
          <td>16px</td>
          <td>
            Use for inner paddings in medium components, for example cards or as
            margins on mobile devices
          </td>
        </tr>
        <tr>
          <td>--spacing-5</td>
          <td>20px</td>
          <td>
            Use for inner paddings in larger components, for example modals
          </td>
        </tr>
        <tr>
          <td>--spacing-6</td>
          <td>24px</td>
          <td>
            Use to separate the content, for examples sections in settings, or
            for margins on desktop
          </td>
        </tr>
        <tr>
          <td>--spacing-8</td>
          <td>32px</td>
          <td>
            Use to separate the content where space is not limiting you, or when
            you need more obvious distincion between components
          </td>
        </tr>
        <tr>
          <td>--spacing-12</td>
          <td>48px</td>
          <td>Use for larger margins for example in empty states</td>
        </tr>
        <tr>
          <td>--spacing-16</td>
          <td>64px</td>
          <td>Use to represent additional data</td>
        </tr>
        <tr>
          <td>--spacing-18</td>
          <td>72px</td>
          <td>Use to represent additional data</td>
        </tr>
        <tr>
          <td>--spacing-20</td>
          <td>80px</td>
          <td>Use to represent additional data</td>
        </tr>
        <tr>
          <td>--spacing-24</td>
          <td>96px</td>
          <td>Use to represent additional data</td>
        </tr>
      </table>
    </div>
  );
};
