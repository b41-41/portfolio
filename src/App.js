import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages';
import Portfolio from './pages/Portfolio.js';

function App() {
  // return <HashRouter>
  //   <Route path="/" exact={true} component={Home} />
  //   <Route path="/portfolio" exact={true} component={Portfolio} />
  // </HashRouter>
  return (
    <>
      <Home />
    </>
  )
}

export default App;
