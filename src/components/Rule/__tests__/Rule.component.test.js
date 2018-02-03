import React from 'react';
import renderer from 'react-test-renderer';
import Rule from '../Rule.component';
import {shallow} from 'enzyme';

describe('Rule component', () => {
  it('Rule: renders correctly', () => {
    const tree = renderer.create(<Rule />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('toggleContent: should toggle accordian visibility', () => {
    const wrapper = shallow(<Rule></Rule>);
    expect(wrapper.instance().state.collapsed).toBe(true);
    wrapper.instance().toggleContent();
    expect(wrapper.instance().state.collapsed).toBe(false);
  })
});
