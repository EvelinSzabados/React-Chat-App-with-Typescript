import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Context/UserContext';
import { ChatProvider } from './Context/ChatContext';

function App(): JSX.Element {

  return (
    <UserProvider>
      <ChatProvider>
        <Router>
          <Route exact path="/" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Router>
      </ChatProvider>
    </UserProvider>
  );
}

export default App;
