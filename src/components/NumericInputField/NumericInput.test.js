import * as React from 'react';
import { shallow } from 'enzyme';
import NumericInput from './NumericInput';

const generateMockChangeEvent = value => ({
  preventDefault: () => {},
  stopPropagation: () => {},
  target: {
    value
  }
});

describe('NumericInput', () => {
  it('should render NumericInput with required props', () => {
    const changeFn = jest.fn();
    const component = shallow(<NumericInput value="1" onChange={changeFn} />);

    expect(component).toMatchSnapshot();
  });

  it('should render NumericInput with all available props', () => {
    const changeFn = jest.fn();
    const component = shallow(
      <NumericInput
        className="numeric-test"
        value=""
        min={1}
        max={100}
        error="Field required"
        onChange={changeFn}
        disabled
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should call change function with calculated value on input change', () => {
    const changeFn = jest.fn();
    const component = shallow(<NumericInput value="1" onChange={changeFn} />);
    const inputEl = component.find('input');

    inputEl.simulate('change', generateMockChangeEvent(''));
    expect(changeFn).toHaveBeenCalledWith('');

    inputEl.simulate('change', generateMockChangeEvent('3'));
    expect(changeFn).toHaveBeenCalledWith('3');
  });

  it('should call change function with calculated value on inc/dec button click', () => {
    const changeFn = jest.fn();
    const component = shallow(<NumericInput value="1" onChange={changeFn} />);

    const incrementBtn = component.find('[aria-label="Increment value"]');
    const decrementBtn = component.find('[aria-label="Decrement value"]');

    incrementBtn.simulate('click');
    expect(changeFn).toHaveBeenCalledWith('2');

    decrementBtn.simulate('click');
    expect(changeFn).toHaveBeenCalledWith('0');
  });

  it('should not allow values smaller than passed min prop', () => {
    const changeFn = jest.fn();
    const component = shallow(
      <NumericInput min={50} value="50" onChange={changeFn} />
    );

    const inputEl = component.find('input');
    const decrementBtn = component.find('[aria-label="Decrement value"]');

    inputEl.simulate('change', generateMockChangeEvent('49'));
    expect(changeFn).toHaveBeenCalledWith('50');

    decrementBtn.simulate('click');
    expect(changeFn).toHaveBeenCalledWith('50');
  });

  it('should not allow values larger than passed max prop', () => {
    const changeFn = jest.fn();
    const component = shallow(
      <NumericInput max={50} value="50" onChange={changeFn} />
    );

    const inputEl = component.find('input');
    const incrementBtn = component.find('[aria-label="Increment value"]');

    inputEl.simulate('change', generateMockChangeEvent('100'));
    expect(changeFn).toHaveBeenCalledWith('50');

    incrementBtn.simulate('click');
    expect(changeFn).toHaveBeenCalledWith('50');
  });
});
