import React, { useContext } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import { ChatProvider } from './Context/ChatContext';
import { SelectedChatProvider } from './Context/SelectedChatContext';
import { PrivateRoute } from './Common/PrivateRoute';
import { FriendProvider } from './Context/FriendContext';
import { NotificationProvider } from './Context/NotificationContext';
import { DrawerVisibleProvider } from './Context/DrawerVisibleContext';
import { ValidLoginContext } from "./Context/ValidLoginContext"
import Signup from './Signup/Signup';

function App(): JSX.Element {
  const { validLogin } = useContext(ValidLoginContext)
  return (

    <Router>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      {validLogin ?
        <SelectedChatProvider>
          <ChatProvider>
            <FriendProvider>
              <NotificationProvider>
                <DrawerVisibleProvider>
                  <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
                </DrawerVisibleProvider>
              </NotificationProvider>
            </FriendProvider>
          </ChatProvider>

        </SelectedChatProvider> :
        <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>}

    </Router>
  );
}

export default App;
