import React from 'react';
import Usuarios from './Usuarios';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Usuarios />);
});
