import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Context/UserContext';

function App(): JSX.Element {

  return (
    <UserProvider>
      <Router>
        <Route exact path="/" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </Router>
    </UserProvider>
  );
}

export default App;
