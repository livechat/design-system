import * as React from 'react';
import { shallow } from 'enzyme';

import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import {Button} from '../Button';
import Promo from './Promo';

describe('Promo', () => {
  const buttonText = "Primary button";
  const header = "This example headline has 40 characters";
  const img = "img";
  const linkText = "Link";
  const onButtonClick = jest.fn();
  const onClose = jest.fn();
  const onLinkClick = jest.fn();
  const props = {
    onClose,
    buttonText,
    header,
    img,
    linkText,
    onButtonClick,
    onClose,
    onLinkClick,
  }
  it('should render promo of any size', () => {
    const sizes = ['small', 'large', 'medium'];
      sizes.map(size => {
        const component = shallow(<Promo size={size} {...props}>Example text</Promo>);

        expect(component).toMatchSnapshot();
      })
  });

  it('should render promo of any size without footer', () => {
    const sizes = ['small', 'large', 'medium'];
    const props = {
      onClose,
      header,
      img,
      onClose,
    }
      sizes.map(size => {
        const component = shallow(<Promo size={size} {...props}>Example text</Promo>);

        expect(component).toMatchSnapshot();
      })
  });

  it('should call on close on close button click', () => {
    const component = shallow(<Promo {...props}>Example text</Promo>);
    component.find('button').simulate('click')
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call buttons actions on buttons click', () => {
    const component = shallow(<Promo {...props}>Example text</Promo>);
    component.find(Button).first().simulate('click')
    component.find(Button).last().simulate('click')
    
    expect(onButtonClick).toHaveBeenCalledTimes(1)
    expect(onLinkClick).toHaveBeenCalledTimes(1)
  })
});
