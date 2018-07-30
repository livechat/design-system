import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from '../../styled';

const noop = () => {};

export const StyledTabAnchor = styled.a`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 24px;
  height: 49px;
  border: none;
  background: none;
  outline: none;
  color: rgba(66, 77, 87, 1);
  cursor: pointer;
  transition: color 0.25s;
  margin: 0 8px;
  font-size: 15px;

  &:hover {
    color: rgba(0, 0, 0, 1);
    text-decoration: none;
  }

  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: block;
    content: '';
    background-color: #4384f5;
    height: 0;
  }

  ${props => {
    if (props.isSelected) {
      return `
        font-weight: 700;

        &:before {
          height: 5px;
        }
      `;
    }
    return '';
  }};
`;

export const StyledLightText = styled.span`
  display: inline-block;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 3px;
  transition: color 0.25s;
  & > *:hover & {
    color: inherit;
    text-decoration: none;
  }
  ${props => {
    if (props.isSelected) {
      return `
        color: inherit;
      `;
    }
    return '';
  }};
`;

const StyledTabButton = StyledTabAnchor.withComponent('button');

const Tab = ({ onSelect, href, isSelected, children, lightText }) => {
  if (href) {
    return (
      <StyledTabAnchor isSelected={isSelected} href={href} onClick={onSelect}>
        {children}
        {lightText ? <StyledLightText>({lightText})</StyledLightText> : null}
      </StyledTabAnchor>
    );
  }

  return (
    <StyledTabButton isSelected={isSelected} onClick={onSelect}>
      {children}
      {lightText ? (
        <StyledLightText isSelected={isSelected}>({lightText})</StyledLightText>
      ) : null}
    </StyledTabButton>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
  lightText: PropTypes.string,
  href: PropTypes.string,
  isSelected: PropTypes.bool
};

Tab.defaultProps = {
  onSelect: noop,
  lightText: null,
  href: null,
  isSelected: false
};

export default Tab;
