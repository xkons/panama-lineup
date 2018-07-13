import React from 'react';
import ReactDOM from 'react-dom';
import LineUp from './LineUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineUp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
