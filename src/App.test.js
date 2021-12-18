import React from 'react';
import SamuraiJSContainer from './App';
import ReactDOM from 'react-dom';


test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SamuraiJSContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
