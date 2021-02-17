import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Counter from './hooks-tests/Counter';
import MouseMove from './hooks-tests/mouseMove';
import Title from './hooks-tests/Title';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>,
  document.getElementById( 'root' )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
