import React from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from '/components/Header/HeaderNav.jsx';
import Main from '/components/Main/Main.jsx';

const App = () => {
  return (
    <div className="app">
      <HeaderNav />
      <Main />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('react-app')
);
