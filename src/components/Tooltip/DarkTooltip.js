import * as PropTypes from 'prop-types';
import styled from '../../styled';

const DarkTooltip = styled.div`
  padding: 11px 12px;
  color: ${props => props.fontColor};
  font-size: 14px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor};
  box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.5);
  margin: 4px;

  &::before {
    content: ' ';
    position: absolute;
    border-width: 4px;
    border-style: solid;

    ${props => {
      if (props.arrowOffset) {
        return `
          top: ${props.arrowOffset}px;
        `;
      }
      return `
        top: 50%;
        transform: translateY(-50%);
      `;
    }};

    ${props => {
      switch (props.arrowPosition) {
        case 'left':
          return `
            border-color: transparent ${
              props.backgroundColor
            } transparent transparent;
            left: -4px;
          `;
        case 'right':
          return `
            border-color: transparent transparent transparent ${
              props.backgroundColor
            };
            right: -4px;
          `;
        case 'top':
          return `
            border-color: transparent transparent ${
              props.backgroundColor
            } transparent;
            top: -4px;
            left: calc(50% - 4px);
          `;
        case 'bottom':
          return `
            border-color: ${
              props.backgroundColor
            } transparent transparent transparent;
            bottom: -4px;
            left: calc(50% - 4px);
          `;
        // no default
      }
      return '';
    }};
  }
`;

DarkTooltip.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  arrowPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  arrowOffset: PropTypes.number
};

DarkTooltip.defaultProps = {
  arrowPosition: 'left',
  fontColor: '#fff',
  className: null,
  backgroundColor: '#3a343c',
  arrowOffset: null
};

/** @component */
export default DarkTooltip;
