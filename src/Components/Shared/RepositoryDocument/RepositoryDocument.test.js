import React from 'react';
import ReactDOM from 'react-dom';
import RepositoryDocument from './RepositoryDocument';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepositoryDocument />, div);
  ReactDOM.unmountComponentAtNode(div);
});