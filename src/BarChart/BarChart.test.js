import React from 'react';
import { shallow } from 'enzyme';
import BarChart from './BarChart';

describe('<BarChart />', () => {
  test('renders', () => {
    const wrapper = shallow(<BarChart />);
    expect(wrapper).toMatchSnapshot();
  });
});
