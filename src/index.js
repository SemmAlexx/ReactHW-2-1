import React from 'react';
import ReactDOM from 'react-dom';
import Reader from './components/Reader';
import publications from './assets/publications.json';

ReactDOM.render(
  <Reader items={publications} />,
  document.getElementById('root'),
);
