import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';


function App() {

  return (

    <Router>
      <Route exact path="/" component={Login}></Route>
    </Router>
  );
}

export default App;
