import * as React from 'react';
import { shallow } from 'enzyme';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import Banner from './Banner';

describe('Banner', () => {
  it('should render small info Banner', () => {
    const component = shallow(<Banner text="Example text" />);

    expect(component).toMatchSnapshot();
  });

  it('should render large Banner', () => {
    const component = shallow(<Banner text="Example text" size="large"/>);

    expect(component).toMatchSnapshot();
  });
  it('should render medium Banner', () => {
    const component = shallow(<Banner text="Example text" size="medium" />);

    expect(component).toMatchSnapshot();
  });
  it('should render warning large Banner', () => {
    const component = shallow(<Banner text="Example text" size="large" type="warning" />);

    expect(component).toMatchSnapshot();
  });
  it('should render info medium Banner', () => {
    const component = shallow(<Banner text="Example text" size="medium" />);

    expect(component).toMatchSnapshot();
  });
  it('should render error small Banner', () => {
    const component = shallow(<Banner text="Example text" type="error" />);

    expect(component).toMatchSnapshot();
  });
  it('should render success large Banner', () => {
    const component = shallow(<Banner text="Example text" type="success" size="large" />);

    expect(component).toMatchSnapshot();
  });
  it('should render Banner with close button', () => {
    const component = shallow(<Banner text="Example text" closeIcon />);

    expect(component).toMatchSnapshot();
  })
  it('should call on close on close button click', () => {
    const onClose = jest.fn();
    const component = shallow(<Banner text="Example text" onClose={onClose} closeIcon />);
    component.find(CloseIcon).simulate('click')
    expect(onClose.mock.calls.length).toEqual(1);
  })
});
