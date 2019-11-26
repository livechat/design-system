import * as React from 'react';
import { shallow } from 'enzyme';
import ButtonGroup from './ButtonGroup';
import Button from '../Button';

const onIndexChangeFn = jest.fn();

describe('ButtonGroup', () => {
  it('should render empty button group', () => {
    const component = shallow(<ButtonGroup />);

    expect(component).toMatchSnapshot();
  });

  it('should render button group with button', () => {
    const component = shallow(
      <ButtonGroup>
        <Button />
      </ButtonGroup>
    );

    expect(component).toMatchSnapshot();
  });

  it('should handle current index change', () => {
    const component = shallow(
      <ButtonGroup onIndexChange={onIndexChangeFn}>
        <Button id="button1" />
        <Button id="button2" />
        <Button id="button3" />
      </ButtonGroup>
    );

    const fakeEvent = new Event('fake');

    component.find('#button1').simulate('click', fakeEvent);
    expect(onIndexChangeFn).toBeCalledWith(0, fakeEvent);

    component.find('#button2').simulate('click', fakeEvent);
    expect(onIndexChangeFn).toBeCalledWith(1, fakeEvent);

    component.find('#button3').simulate('click', fakeEvent);
    expect(onIndexChangeFn).toBeCalledWith(2, fakeEvent);
  });

  it('should use current index from porps', () => {
    const component = shallow(
      <ButtonGroup currentIndex={1}>
        <Button />
      </ButtonGroup>
    );

    expect(component.state('index')).toBe(1);
  });
});
