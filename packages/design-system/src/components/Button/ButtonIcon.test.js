import * as React from 'react';
import { shallow } from 'enzyme';
import { ButtonIcon } from './ButtonIcon';

describe('ButtonIcon', () => {
  it('should render button with positioned icon', () => {
    const IconMock = () => <div />;
    const leftIconButton = shallow(
      <ButtonIcon position="left">
        <IconMock />
      </ButtonIcon>
    );
    const rightIconButton = shallow(
      <ButtonIcon position="right">
        <IconMock />
      </ButtonIcon>
    );

    expect(leftIconButton).toMatchSnapshot();
    expect(rightIconButton).toMatchSnapshot();
  });
});
