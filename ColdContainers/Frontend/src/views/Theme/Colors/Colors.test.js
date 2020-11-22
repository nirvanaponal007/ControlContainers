import React from 'react';
import Colors from './Contenedores';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Colors />);
});
