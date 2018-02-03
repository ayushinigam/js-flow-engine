import React from 'react';
import renderer from 'react-test-renderer';
import InputWithLabel from '../InputWithLabel.component';
describe('InputWithLabel component', () => {
  it('InputWithLabel: renders correctly', () => {
    const tree = renderer.create(<InputWithLabel />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
